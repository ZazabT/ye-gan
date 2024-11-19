import React from "react";
import { motion } from "framer-motion";

const LearnMore = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-16 space-y-16 ">
      {/* Header Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-extrabold text-green-700 ">
          Welcome to Yegnan
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Discover the best experiences and embark on an unforgettable journey through Ethiopia’s
          rich culture, history, and natural beauty.
        </p>
      </motion.header>

      {/* About Ethiopia Section */}
      <section className="space-y-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-4xl font-semibold text-green-700 text-center"
        >
          Why Ethiopia?
        </motion.h2>
        <div className="space-y-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-gray-700 text-lg leading-relaxed"
          >
            Ethiopia, known as the cradle of humanity, offers a rich tapestry of history, vibrant
            culture, and awe-inspiring landscapes. With attractions like the rock-hewn churches of
            Lalibela, the Simien Mountains, and the mystical Danakil Depression, Ethiopia’s charm
            captivates every traveler.
          </motion.p>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            src="https://media.istockphoto.com/id/697529054/photo/the-church-of-saint-george-in-lalibela.jpg?b=1&s=612x612&w=0&k=20&c=dl-X6Tt04ETFG8KegFc3D78OcThdYR4diURpc5lkCP8="
            alt="Lalibela Churches"
            className="rounded-lg shadow-lg w-full max-w-4xl mx-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Unique Experiences Section */}
      <section className="space-y-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-4xl font-semibold text-green-700 text-center"
        >
          Curated Experiences with Yegnan
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="space-y-4"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              At Yegnan, we bring you the best of Ethiopia through carefully curated experiences.
              Whether you're seeking adventure, cultural immersion, or tranquil escapes, Yegnan has
              something special for everyone.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Stay in traditional **tukuls** (Ethiopian huts) nestled amidst breathtaking
                landscapes.
              </li>
              <li>Explore vibrant markets and enjoy world-famous Ethiopian coffee.</li>
              <li>Celebrate iconic festivals like **Timket** and **Meskel** with locals.</li>
              <li>
                Embark on guided tours to hidden gems like the Omo Valley and the Rift Valley Lakes.
              </li>
            </ul>
          </motion.div>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            src="https://media.istockphoto.com/id/507909722/photo/traditional-ethiopian-coffee-pot.jpg?b=1&s=612x612&w=0&k=20&c=9s7wQokVtggheeK3RtmG6wWCHZLkqfwZQcUyjWsU6LY="
            alt="Ethiopian Coffee Ceremony"
            className="rounded-lg shadow-lg w-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="text-center space-y-6"
      >
        <h2 className="text-4xl font-semibold text-green-700">
          Start Your Ethiopian Adventure Today
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
          Yegnan is your gateway to discovering the soul of Ethiopia. Connect with local hosts,
          immerse yourself in cultural traditions, and experience the journey of a lifetime.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-8 py-3 mt-4 rounded-lg shadow-lg hover:bg-green-700 transition"
          onClick={() => alert("Redirecting to Booking Page...")}
        >
          Explore Experiences
        </motion.button>
      </motion.section>
    </div>
  );
};

export default LearnMore;
