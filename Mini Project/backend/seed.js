const mongoose = require('mongoose');
const User = require('./models/User');
const Mess = require('./models/Mess');

async function seedMesses() {
    try {
        await mongoose.connect('mongodb://localhost:27017/messconnect');
        console.log('MongoDB connected for seeding');

        // Create a mock owner
        let owner = await User.findOne({ email: 'owner_seed@example.com' });
        if (!owner) {
            owner = await User.create({
                fullName: 'Mock Owner',
                email: 'owner_seed@example.com',
                phone: '9876543211',
                password: 'password123',
                role: 'owner',
                isVerified: true
            });
            console.log('Mock owner created');
        }

        const messesToInsert = [
            {
                owner: owner._id,
                name: 'Authentic Maharashtrian Thali',
                description: 'Best local Maharashtrian food in town. Homemade quality and taste.',
                type: 'Pure Veg',
                location: {
                    address: 'Kothrud',
                    city: 'Pune',
                    coordinates: [73.8166, 18.5074]
                },
                photos: ['https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop'],
                subscriptionPlans: [
                    { name: 'Standard Monthly', mealsIncluded: ['lunch', 'dinner'], durationDays: 30, price: 2500 }
                ],
                timings: { breakfast: '08:00 AM - 10:00 AM', lunch: '12:00 PM - 02:30 PM', dinner: '07:30 PM - 10:00 PM' },
                features: ['WiFi', 'AC'],
                capacity: 50,
                rating: { average: 4.8, count: 120 },
                isVerified: true
            },
            {
                owner: owner._id,
                name: 'Protein Box Kitchen',
                description: 'Healthy lean meals tailored for fitness enthusiasts.',
                type: 'Veg & Non-veg',
                location: {
                    address: 'Viman Nagar',
                    city: 'Pune',
                    coordinates: [73.9167, 18.5665]
                },
                photos: ['https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1000&auto=format&fit=crop'],
                subscriptionPlans: [
                    { name: 'Premium Monthly', mealsIncluded: ['lunch', 'dinner'], durationDays: 30, price: 3200 }
                ],
                timings: { breakfast: '07:30 AM - 10:30 AM', lunch: '12:30 PM - 03:00 PM', dinner: '08:00 PM - 10:30 PM' },
                features: ['Dietician Approved', 'AC'],
                capacity: 40,
                rating: { average: 4.5, count: 85 },
                isVerified: true
            },
            {
                owner: owner._id,
                name: 'Home Style Meals',
                description: 'Just like mom makes it. Simple, hygienic, and affordable.',
                type: 'Pure Veg',
                location: {
                    address: 'Shivaji Nagar',
                    city: 'Pune',
                },
                photos: ['https://images.unsplash.com/photo-1694141253763-209b4c8f8ace?q=80&w=1000&auto=format&fit=crop'],
                subscriptionPlans: [
                    { name: 'Student Saver', mealsIncluded: ['lunch', 'dinner'], durationDays: 30, price: 2200 }
                ],
                timings: { breakfast: '08:30 AM - 10:00 AM', lunch: '01:00 PM - 03:00 PM', dinner: '08:00 PM - 10:00 PM' },
                features: ['Home Delivery'],
                capacity: 100,
                rating: { average: 4.2, count: 210 },
                isVerified: true
            }
        ];

        // Clear previous messes by this owner to avoid duplicates if run multiple times
        await Mess.deleteMany({ owner: owner._id });

        await Mess.insertMany(messesToInsert);
        console.log('Messes inserted successfully');

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

seedMesses();
