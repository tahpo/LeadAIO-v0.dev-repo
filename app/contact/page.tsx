@@ .. @@
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     company: "",
     message: ""
   })
 
+  // Updated with actual tech company logos
   const brands = [
-    { name: "Google" },
-    { name: "Apple" },
-    { name: "Amazon" },
-    { name: "Microsoft" },
-    { name: "Netflix" },
-    { name: "Spotify" },
-    { name: "Twitter" },
-    { name: "Meta" }
+    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
+    { name: "Supabase", logo: "https://supabase.com/favicon/favicon-32x32.png" },
+    { name: "Prisma", logo: "https://prismalens.vercel.app/header/logo-dark.svg" },
+    { name: "Railway", logo: "https://railway.app/brand/logo-light.svg" },
+    { name: "Planetscale", logo: "https://planetscale.com/favicon.svg" },
+    { name: "Stripe", logo: "https://stripe.com/img/v3/home/social.png" },
+    { name: "Algolia", logo: "https://www.algolia.com/algoliaweb-static-favicons/light-mode/favicon-32x32.png" },
+    { name: "Cloudflare", logo: "https://www.cloudflare.com/favicon.ico" }
   ]
 
   const handleSubmit = (e: React.FormEvent) => {
@@ .. @@
       <Header />
       
       {/* Main content */}
-      <main className="flex-grow pt-32">
+      <main className="flex-grow pt-28">
         <div className="container max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
             {/* Left Column - Title */}
-            <div>
+            <div className="lg:pt-12">
               <h1 className="text-4xl md:text-5xl font-garnett mb-6">Let's talk about your project</h1>
               <p className="text-lg text-gray-600 max-w-xl font-universal">
                 Ready to take your search rankings to the next level? We're here to help you achieve your SEO goals.
               </p>
               
               {/* Contact Cards - Moved and resized */}
-              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
+              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto pt-[420px]">
@@ .. @@
                 </Button>
               </form>
             </div>
           </div>
 
           {/* Brands Section */}
-          <div className="py-20 bg-white overflow-hidden">
+          <div className="py-12 bg-white overflow-hidden">
             <div className="flex space-x-12 animate-scroll">
               {[...brands, ...brands].map((brand, i) => (
                 <div key={i} className="flex-none grayscale opacity-50 hover:opacity-75 transition-opacity">
-                  <span className="text-gray-400 text-lg font-universal">{brand.name}</span>
+                  <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain" />
                 </div>
               ))}
             </div>