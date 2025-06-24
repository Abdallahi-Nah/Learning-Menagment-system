import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const ClerkWebhooks = async (req, res) => {
  console.log("📩 Webhook reçu à /clerk");
  try {
    console.log("📩 Webhook reçu !");
    console.log("🧾 Headers:", req.headers);
    console.log("📦 Body:", JSON.stringify(req.body, null, 2));

    const wbhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await wbhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        console.log("👤 Création utilisateur détectée !");
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        console.log("📌 Données utilisateur :", userData);
        await User.create(userData);
        console.log("✅ Utilisateur enregistré !");
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("♻️ Utilisateur mis à jour !");
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ Utilisateur supprimé !");
        res.json({});
        break;
      }

      default:
        console.warn("⚠️ Type de webhook non géré :", type);
        res.status(400).json({ message: "Unhandled webhook type" });
        break;
    }
  } catch (error) {
    console.error("❌ Erreur dans le webhook :", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const stripeWebhooks = async (req, res) => {

};
