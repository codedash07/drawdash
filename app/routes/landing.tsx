import { MetaFunction } from "@remix-run/node";
import logo from "../assets/logos/logo.png";

export const meta: MetaFunction = () => {
  return [{ title: "Drawdash" }, { name: "description", content: "Drawing!" }];
};

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md text-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Drawdash Logo" className="h-16" />
          {/* Logo size increased */}
          <div>
            <a href="#features" className="px-4 hover:text-blue-500">
              Features
            </a>
            <a href="#about" className="px-4 hover:text-blue-500">
              About
            </a>
            <a href="#contact" className="px-4 hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-100 text-gray-800 text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to Drawdash</h1>
        <p className="text-xl">Your personal digital canvas for creativity</p>
      </header>

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Powerful Features of Drawdash
          </h2>
          <div className="flex flex-wrap justify-center">
            {/* Detailed Feature 1 */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <h3 className="text-xl font-semibold mb-2">
                Advanced Drawing Tools
              </h3>
              <p>
                Discover a comprehensive suite of drawing tools that cater to
                both beginners and professionals. Enjoy a variety of brushes,
                pencils, and pens, each with adjustable sizes and opacity.
                Whether you&apos;re sketching, inking, or painting, Drawdash
                provides the perfect tools for your artistic journey.
              </p>
            </div>
            {/* Detailed Feature 2 */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <h3 className="text-xl font-semibold mb-2">Layer Management</h3>
              <p>
                Manage your artwork with ease using our intuitive layer system.
                Add, remove, and reorder layers to create complex drawings
                without losing track of your work. Each layer is fully
                customizable, allowing for opacity adjustments and blending
                modes, giving you complete control over your creation.
              </p>
            </div>
            {/* Detailed Feature 3 */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <h3 className="text-xl font-semibold mb-2">
                Cloud Saving and Accessibility
              </h3>
              <p>
                Never worry about losing your work again. Drawdash offers
                seamless cloud saving, ensuring that your drawings are safely
                stored and accessible from any device. Log in to your account
                from anywhere to access your art, making it easy to continue
                your work on the go or share it with others.
              </p>
            </div>
            {/* Additional Detailed Features */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Drawdash</h2>
          <p className="max-w-2xl mx-auto">
            Drawdash is the perfect place for artists and hobbyists to express
            their creativity. Whether you&apos;re a professional artist or just
            starting out, our platform offers a user-friendly interface with
            powerful tools to bring your artistic visions to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="mb-4">
            Questions or feedback? I&apos;d love to hear from you.
          </p>
          <a
            href="mailto:aryankush025@gmail.com"
            className="underline text-blue-500"
          >
            aryankush025@gmail.com
          </a>
        </div>
      </section>

      {/* Footer with Developer Details */}
      <footer className="bg-gray-100 text-gray-800 text-center p-6">
        <p>Follow me on social media for the latest updates!</p>
        {/* Social Media Links */}
        {/* ... */}
        <div className="mt-4">
          <p className="font-semibold">Developed by Aryan Agarwal</p>
          <a
            href="https://github.com/aryankush25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline px-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aryankush25/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline px-2"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/aryankush25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline px-2"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
