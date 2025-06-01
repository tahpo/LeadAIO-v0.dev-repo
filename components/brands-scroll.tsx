"use client"

const brands = [
  { name: "Google" },
  { name: "Apple" },
  { name: "Amazon" },
  { name: "Microsoft" },
  { name: "Netflix" },
  { name: "Spotify" },
  { name: "Twitter" },
  { name: "Meta" }
]

export function BrandsScroll() {
  return (
    <div className="py-12 overflow-hidden">
      <div className="flex space-x-12 animate-scroll">
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} className="flex-none grayscale opacity-50 hover:opacity-75 transition-opacity">
            <span className="text-gray-400 text-lg font-universal">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}