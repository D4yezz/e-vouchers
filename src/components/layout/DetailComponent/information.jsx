export default function Information({ paket }) {
  return (
    <div className="flex flex-col w-1/2">
      <span className="px-6 py-2 mb-4 font-semibold text-red-600 bg-red-100 rounded-full w-fit">
        {paket.provider}
      </span>
      <h1 className="mt-4 text-5xl font-bold">{paket.name}</h1>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-end justify-center mx-auto my-6">
          <h3 className="text-transparent bg-linear-to-br from-red-600 to-red-800 bg-clip-text text-[14rem] leading-45 font-bold">
            {paket.kuota}
          </h3>
          <span className="text-5xl font-bold opacity-70">GB</span>
        </div>
      </div>
    </div>
  );
}
