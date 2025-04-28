import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connecter à MongoDB
mongoose.connect('YOUR_MONGODB_URI')
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Définir le schéma et le modèle pour les commandes
const OrderSchema = new mongoose.Schema({
    weight: { type: Number, required: true },
    nature: { type: String, required: true },
    truckType: { type: String, required: true },
    senderName: { type: String, required: true },
    senderAddress: { type: String, required: true },
    recipientName: { type: String, required: true },
    recipientAddress: { type: String, required: true },
    distance: { type: Number, required: true }, // en mètres
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

// Routes
app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});