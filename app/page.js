export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
<div className="flex items-center gap-4 mb-10">

  <img
    src="/logo.png"
    alt="GK GROUP Logo"
    className="w-20 h-20 object-contain"
  />

  <div className="text-5xl font-black">
    <span className="text-white">GK</span>
    <span className="text-orange-400"> GROUP</span>
  </div>

</div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Global Business
            <br />
            Without Borders
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl mb-10">
            International business solutions across Technology,
            Travel, Trade, Import & Export connecting Africa,
            Europe and the Balkans.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-semibold">
              Explore Services
            </button>

            <button className="border border-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-blue-900 transition">
              Contact Us
            </button>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our Companies
            </h2>

            <p className="text-gray-600 text-lg">
              Specialized divisions operating internationally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                GK Informatique
              </h3>

              <p className="text-gray-600 mb-4">
                IT Solutions • Networking • Software • CCTV • Digital Services
              </p>

              <p className="text-sm text-orange-500 font-semibold">
                Lomé, Togo
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                GK Travel Agency
              </h3>

              <p className="text-gray-600 mb-4">
                Visa Assistance • Flight Booking • Travel Consulting
              </p>

              <p className="text-sm text-orange-500 font-semibold">
                Lomé, Togo
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                UAB GK EstTrade
              </h3>

              <p className="text-gray-600 mb-4">
                Import • Export • European Trade Operations
              </p>

              <p className="text-sm text-orange-500 font-semibold">
                Vilnius, Lithuania
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                GK Danube Trading DOO
              </h3>

              <p className="text-gray-600 mb-4">
                Balkan Business Development • Logistics • Partnerships
              </p>

              <p className="text-sm text-orange-500 font-semibold">
                Novi Sad, Serbia
              </p>
            </div>

          </div>
        </div>
      </section>
{/* WHY CHOOSE US */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">
        Why Choose GK GROUP
      </h2>

      <p className="text-gray-600 text-lg">
        International expertise with reliable business solutions.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-blue-50 p-8 rounded-3xl shadow-lg text-center">
        <div className="text-5xl mb-4">🌍</div>

        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Global Network
        </h3>

        <p className="text-gray-600">
          Operations across Africa and Europe.
        </p>
      </div>

      <div className="bg-blue-50 p-8 rounded-3xl shadow-lg text-center">
        <div className="text-5xl mb-4">⚡</div>

        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Fast Processing
        </h3>

        <p className="text-gray-600">
          Quick and efficient service delivery.
        </p>
      </div>

      <div className="bg-blue-50 p-8 rounded-3xl shadow-lg text-center">
        <div className="text-5xl mb-4">🤝</div>

        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Trusted Partners
        </h3>

        <p className="text-gray-600">
          Reliable international collaborations.
        </p>
      </div>

      <div className="bg-blue-50 p-8 rounded-3xl shadow-lg text-center">
        <div className="text-5xl mb-4">🚀</div>

        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Business Growth
        </h3>

        <p className="text-gray-600">
          Helping businesses expand globally.
        </p>
      </div>

    </div>
  </div>
</section>
      {/* ABOUT */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-8">
            About GK GROUP
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            GK GROUP is an international business network
            connecting Africa and Europe through innovation,
            technology, travel solutions, import-export operations
            and international partnerships.
          </p>

        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Contact GK GROUP
            </h2>

            <p className="text-gray-300">
              Connect with our international offices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div className="bg-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-3 text-orange-400">
                Email
              </h3>

              <p>info@gkgroup.app</p>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-3 text-orange-400">
                Website
              </h3>

              <p>www.gkgroup.app</p>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-3 text-orange-400">
                Phone
              </h3>

              <p>+228 90 55 98 88</p>
            </div>

          </div>

        </div>
      </section>
<a
  href="https://wa.me/22890559888"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl text-lg font-bold z-50"
>
  WhatsApp
</a>

</main>
  );
}