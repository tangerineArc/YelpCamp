const mongoose = require("mongoose");
const axios = require("axios");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Mongo connected successfully!");
    })
    .catch(err => {
        console.log("Error: Couldn't connect to Mongo!");
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

// async function seedImg() {
//     try {
//       const resp = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: "ic272elILunfbCAypCQjAVQStUp1zyAECJCTreM3GXM",
//           collections: 483251
//         }
//       })
//       return resp.data.urls.small
//     } catch (err) {
//       console.error(err)
//     }
//   }

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          author: "6582dcc7e11d139244e5fef1",
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          // image: await seedImg(),
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius adipisci porro doloribus! Voluptates aperiam perferendis labore excepturi ullam, corporis minus sit architecto perspiciatis molestiae dolorem. Ullam maiores est distinctio unde.",
          price,
          geometry: {
            type: "Point",
            coordinates: [
              cities[random1000].longitude,
              cities[random1000].latitude
            ]
          },
          images: [
            {
              url: 'https://res.cloudinary.com/de2unvzdb/image/upload/v1703228158/YelpCamp/ob2vimfwsijfmn02twio.jpg',
              filename: 'YelpCamp/ob2vimfwsijfmn02twio',
            },
            {
              url: 'https://res.cloudinary.com/de2unvzdb/image/upload/v1703228161/YelpCamp/j3axact70rqs1mntex4c.jpg',
              filename: 'YelpCamp/j3axact70rqs1mntex4c',
            }
          ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});