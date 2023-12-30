import { MetaFunction } from "@remix-run/node";
import logo from "../assets/logos/logo.png"; // Update the path as needed
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Drawdash" },
    { name: "description", content: "Welcome to Drawdash!" },
  ];
};

function App() {
  return (
    <div className="App">
      {/* Hero Section with Larger Logo */}
      <header className="relative bg-blue-100 text-gray-800 text-center py-20">
        <div className="container mx-auto">
          <img src={logo} alt="Drawdash Logo" className="mx-auto mb-4 h-36" />
          <h1 className="text-5xl font-bold mb-4">Welcome to Drawdash</h1>
          <p className="text-xl mb-6">
            Your personal digital canvas for creativity and collaboration.
          </p>
          <Link
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            to="/login"
          >
            Start Drawing
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-500">
            Powerful Features of Drawdash
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card">
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
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Advanced Layering</h3>
              <p>
                Manage your artwork with ease using our intuitive layer system.
                Add, remove, and reorder layers to create complex drawings
                without losing track of your work. Each layer is fully
                customizable, allowing for opacity adjustments and blending
                modes, giving you complete control over your creation.
              </p>
            </div>
            <div className="feature-card">
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
            {/* Additional Feature Cards */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-10">
        <div className="container mx-auto text-center p-4">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p>
            Drawdash is a platform born from the passion for art and design.
            It&apos;s a space where creativity meets technology, allowing
            artists and designers of all levels to explore and express their
            talents.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-500">
            Get in Touch
          </h2>
          <p>
            Have questions or suggestions? We&apos;re all ears. Reach out to us,
            and let&apos;s make Drawdash even better together.
          </p>
          {/* Insert Contact Form Here */}
          <a
            href="mailto:aryankush025@gmail.com"
            className="underline text-blue-500"
          >
            aryankush025@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center p-6">
        <p className="font-semibold">Crafted with Passion by Aryan Agarwal</p>
        <a
          href="https://github.com/aryankush25"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline px-2"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/aryankush25/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline px-2"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/aryankush25"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline px-2"
        >
          Twitter
        </a>
      </footer>
    </div>
  );
}

export default App;
