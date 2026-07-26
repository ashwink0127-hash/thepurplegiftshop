import { useEffect, useState } from "react";

import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Gift,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./App.css";


function App() {

  const [images, setImages] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);


  // LOAD ALL IMAGES FROM public/images/images.json
  useEffect(() => {
  fetch("https://ashwink0127-hash.github.io/thepurplegiftshop/images/images.json")
    .then((response) => response.json())
    .then((imageData) => {
      const imageProducts = imageData
        .filter((item) => item.price > 0)
        .map((item, index) => ({
          id: index + 1,
          name: item.image
            .replace(".jpg", "")
            .replace(/[-_]/g, " "),
          category: "Gift",
          price: item.price,
          oldPrice: Math.round(item.price * 1.35),
          image: `https://ashwink0127-hash.github.io/thepurplegiftshop/images/${item.image}`,
          rating: 5,
        }));

      setImages(imageProducts);
    })
    .catch((error) => {
      console.error("Unable to load images:", error);
    });
}, []);


  const filteredProducts = images.filter((product) => {

    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return searchMatch;

  });


  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        );


      if (existingProduct) {

        return currentCart.map((item) =>

          item.id === product.id

            ? {
                ...item,
                quantity: item.quantity + 1,
              }

            : item

        );

      }


      return [

        ...currentCart,

        {
          ...product,
          quantity: 1,
        },

      ];

    });


    setCartOpen(true);

  };


  const increaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart.map((item) =>

        item.id === id

          ? {
              ...item,
              quantity: item.quantity + 1,
            }

          : item

      )

    );

  };


  const decreaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart

        .map((item) =>

          item.id === id

            ? {
                ...item,
                quantity: item.quantity - 1,
              }

            : item

        )

        .filter(
          (item) => item.quantity > 0
        )

    );

  };


  const removeFromCart = (id) => {

    setCart((currentCart) =>

      currentCart.filter(
        (item) => item.id !== id
      )

    );

  };


  const cartItemsCount = cart.reduce(

    (total, item) =>

      total + item.quantity,

    0

  );


  const cartTotal = cart.reduce(

    (total, item) =>

      total +

      item.price *

      item.quantity,

    0

  );


  return (

    <div className="app">


      {/* NAVBAR */}

      <header className="navbar">

        <div className="container nav-container">


          <a
            href="#home"
            className="logo"
          >

            <img
              src="https://ashwink0127-hash.github.io/thepurplegiftshop/logo.jpg"
              alt="The Purple Gift Shop"
            />

            <div>

              <span>
                The Purple
              </span>

              <small>
                Gift Shop
              </small>

            </div>

          </a>


          <nav
            className={
              mobileMenu
                ? "nav-links active"
                : "nav-links"
            }
          >

            <a
              href="#home"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Home
            </a>

            <a
              href="#products"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Products
            </a>

            <a
              href="#about"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Contact
            </a>

          </nav>


          <div className="nav-actions">


            <button className="icon-button">

              <User size={21} />

            </button>


            <button className="icon-button">

              <Heart size={21} />

            </button>


            <button

              className="cart-button"

              onClick={() =>
                setCartOpen(true)
              }

            >

              <ShoppingBag size={21} />

              <span>
                {cartItemsCount}
              </span>

            </button>


            <button

              className="mobile-menu-button"

              onClick={() =>
                setMobileMenu(!mobileMenu)
              }

            >

              {mobileMenu ? (

                <X />

              ) : (

                <Menu />

              )}

            </button>


          </div>


        </div>

      </header>


      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div
          className="container hero-content"
        >


          <div className="hero-text">


            <div className="hero-label">

              <Sparkles size={16} />

              Gifts made with love

            </div>


            <h1>

              Make every

              <span>
                moment special.
              </span>

            </h1>


            <p>

              Discover beautiful gifts
              for every special person
              and every unforgettable
              moment.

            </p>


            <a

              href="#products"

              className="primary-button"

            >

              Explore Gifts

              <ArrowRight size={18} />

            </a>


          </div>


          <div className="hero-image">


            <div
              className="hero-circle"
            ></div>


            {images.length > 0 && (

              <img

                src={images[0].image}

                alt={images[0].name}

              />

            )}


            <div
              className="floating-card"
            >

              <Gift size={22} />


              <div>

                <strong>
                  Special Gifts
                </strong>

                <small>
                  For special people
                </small>

              </div>


            </div>


          </div>


        </div>

      </section>


      {/* FEATURES */}

      <section className="features">

        <div
          className="container feature-grid"
        >


          <div className="feature-item">

            <div className="feature-icon">

              <Gift />

            </div>


            <div>

              <h3>
                Unique Gifts
              </h3>

              <p>
                Handpicked gifts
                for everyone
              </p>

            </div>

          </div>


          <div className="feature-item">

            <div className="feature-icon">

              <Truck />

            </div>


            <div>

              <h3>
                Fast Delivery
              </h3>

              <p>
                Quick delivery to
                your doorstep
              </p>

            </div>

          </div>


          <div className="feature-item">

            <div className="feature-icon">

              <ShieldCheck />

            </div>


            <div>

              <h3>
                Secure Shopping
              </h3>

              <p>
                100% safe checkout
              </p>

            </div>

          </div>


        </div>

      </section>


      {/* PRODUCTS */}

      <section
        className="products-section"
        id="products"
      >

        <div className="container">


          <div className="section-header">


            <div>

              <span
                className="section-tag"
              >
                Our Collection
              </span>


              <h2>
                Find the perfect gift
              </h2>


              <p>
                Choose something special
                for someone special.
              </p>

            </div>


            <div className="search-box">

              <Search size={20} />


              <input

                type="text"

                placeholder="Search gifts..."

                value={searchTerm}

                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }

              />

            </div>


          </div>


          <div className="product-grid">


            {filteredProducts.map(
              (product) => (


                <div

                  className="product-card"

                  key={product.id}

                >


                  <div
                    className="product-image"
                  >


                    <img

                      src={product.image}

                      alt={product.name}

                      onError={(e) => {

                        e.currentTarget.style.display =
                          "none";

                      }}

                    />


                    <button
                      className="wishlist-button"
                    >

                      <Heart size={18} />

                    </button>


                    <span
                      className="discount"
                    >
                      SALE
                    </span>


                  </div>


                  <div
                    className="product-info"
                  >


                    <span
                      className="product-category"
                    >
                      Gift
                    </span>


                    <h3>
                      {product.name}
                    </h3>


                    <div
                      className="rating"
                    >
                      ★★★★★
                    </div>


                    <div
                      className="price-row"
                    >


                      <div
                        className="price"
                      >

                        <strong>
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>


                        <del>
                          ₹
                          {product.oldPrice.toLocaleString(
                            "en-IN"
                          )}
                        </del>

                      </div>


                      <button

                        className="add-button"

                        onClick={() =>
                          addToCart(
                            product
                          )
                        }

                      >

                        <Plus size={20} />

                      </button>


                    </div>


                  </div>


                </div>


              )

            )}


          </div>


          {filteredProducts.length === 0 && (

            <div className="no-products">

              No images found.

            </div>

          )}


        </div>

      </section>


      {/* ABOUT */}

      <section
        className="about-section"
        id="about"
      >

        <div
          className="container about-content"
        >


          <div className="about-image">

            {images.length > 1 && (

              <img

                src={images[1].image}

                alt="Gift collection"

              />

            )}

          </div>


          <div className="about-text">


            <span
              className="section-tag"
            >
              About Us
            </span>


            <h2>

              Gifts that tell

              <span>
                your story.
              </span>

            </h2>


            <p>

              At The Purple Gift Shop,
              we believe that the perfect
              gift can make a moment
              unforgettable.

            </p>


            <a

              href="#products"

              className="secondary-button"

            >

              Shop Our Collection

              <ArrowRight size={18} />

            </a>


          </div>


        </div>

      </section>


      {/* CONTACT */}

      <section
        className="contact-section"
        id="contact"
      >

        <div
          className="container contact-box"
        >


          <div>

            <span
              className="section-tag"
            >
              Need Help?
            </span>


            <h2>
              Let's find the
              perfect gift.
            </h2>


            <p>
              Have questions?
              Contact our gift experts.
            </p>

          </div>


          <button
            className="primary-button"
          >

            Contact Us

            <ArrowRight size={18} />

          </button>


        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">


        <div
          className="container footer-grid"
        >


          <div
            className="footer-brand"
          >

            <h2>

              The Purple

              <span>
                Gift Shop
              </span>

            </h2>


            <p>

              Making every moment
              special with beautiful gifts.

            </p>

          </div>


          <div>

            <h3>
              Quick Links
            </h3>

            <a href="#home">
              Home
            </a>

            <a href="#products">
              Products
            </a>

            <a href="#about">
              About Us
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>


          <div>

            <h3>
              Contact
            </h3>

            <p>
              Chennai, Tamil Nadu
            </p>

            <p>
              +91 7305554674
                        </p>

            <p>
              hello@purplegiftshop.com
            </p>

          </div>


        </div>


        <div
          className="copyright"
        >

          © 2026 The Purple Gift Shop.
          All rights reserved.

        </div>


      </footer>


      {/* CART */}

      {cartOpen && (


        <div
          className="cart-overlay"
        >


          <div

            className="cart-background"

            onClick={() =>
              setCartOpen(false)
            }

          ></div>


          <aside
            className="cart-sidebar"
          >


            <div
              className="cart-header"
            >

              <h2>
                Your Cart
              </h2>


              <button

                onClick={() =>
                  setCartOpen(false)
                }

              >

                <X />

              </button>

            </div>


            {cart.length === 0 ? (


              <div
                className="empty-cart"
              >

                <ShoppingBag size={50} />


                <h3>
                  Your cart is empty
                </h3>


                <p>
                  Add beautiful gifts
                  to your cart.
                </p>


                <button

                  className="primary-button"

                  onClick={() =>
                    setCartOpen(false)
                  }

                >

                  Start Shopping

                </button>


              </div>


            ) : (


              <>


                <div
                  className="cart-items"
                >


                  {cart.map(
                    (item) => (


                      <div

                        className="cart-item"

                        key={item.id}

                      >


                        <img

                          src={item.image}

                          alt={item.name}

                        />


                        <div
                          className="cart-item-details"
                        >

                          <h3>
                            {item.name}
                          </h3>


                          <strong>

                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}

                          </strong>


                          <div
                            className="quantity-control"
                          >


                            <button

                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }

                            >

                              <Minus size={15} />

                            </button>


                            <span>
                              {item.quantity}
                            </span>


                            <button

                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }

                            >

                              <Plus size={15} />

                            </button>


                          </div>


                        </div>


                        <button

                          className="delete-button"

                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }

                        >

                          <Trash2 size={18} />

                        </button>


                      </div>


                    )

                  )}


                </div>


                <div
                  className="cart-footer"
                >


                  <div
                    className="cart-total"
                  >

                    <span>
                      Total
                    </span>


                    <strong>

                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}

                    </strong>

                  </div>


                  <button
                    className="checkout-button"
                  >

                    Proceed to Checkout

                    <ArrowRight size={18} />

                  </button>


                </div>


              </>

            )}


          </aside>


        </div>

      )}


    </div>

  );

}


export default App;