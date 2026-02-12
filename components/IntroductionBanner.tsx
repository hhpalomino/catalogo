"use client";

export default function IntroductionBanner() {
  return (
    <div className="w-full bg-[#2563EB] dark:bg-[#18468B] py-16 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ¡Bienvenido a Garage Market!
          </h2>
          <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-8 drop-shadow-md font-medium">
            Encuentra productos de calidad. Si tienes cualquier duda sobre algún artículo,
            <span className="block mt-1">escríbenos por WhatsApp:</span>
          </p>

          {/* Botones de WhatsApp */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/56996990301?text=Hola%20Nati%2C%20te%20escribo%20desde%20Garage%20Market"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#04b948] hover:bg-[#039e3a] text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <img src="/images/icons/whatsapp-white.svg" alt="WhatsApp" className="w-7 h-7" />
              <div className="text-left">
                <div className="font-bold text-white">Escribir a Nati</div>
                <div className="text-sm font-semibold text-white">(+56 9 9699 0301)</div>
              </div>
            </a>
            <a
              href="https://wa.me/56991594818?text=Hola%20Tito%2C%20te%20escribo%20desde%20Garage%20Market"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#04b948] hover:bg-[#039e3a] text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <img src="/images/icons/whatsapp-white.svg" alt="WhatsApp" className="w-7 h-7" />
              <div className="text-left">
                <div className="font-bold text-white">Escribir a Tito</div>
                <div className="text-sm font-semibold text-white">(+56 9 9159 4818)</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
