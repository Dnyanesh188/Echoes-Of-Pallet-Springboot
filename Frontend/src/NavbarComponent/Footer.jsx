import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color1">
                    Online Bidding System
                  </h5>

                  <p className="text-color1">
                    Welcome to our online bidding hub, where sellers showcase,
                    buyers bid, and thrilling auctions unfold. Explore, engage,
                    and bid smartly for unparalleled experiences!
                  </p>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color1 ">About us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color1">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color1">Contact us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color1">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color1">Careers</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color1">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color1">Links</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-color1">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 3
                      </a>
                    </li>
                    <li>
                      <a href="#!" class="text-color1">
                        Link 4
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr class="mb-4" />

            <section class="">
              <p class="d-flex justify-content-center align-items-center">
                <span class="me-3 text-color1">Login from here</span>
                <Link to="/user/login" class="active">
                  <button
                    type="button"
                    class="btn btn-outline-light btn-rounded bg-color custom-bg-text"
                  >
                    Log in
                  </button>
                </Link>
              </p>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="text-center text-color1">
            © 2025 Copyright:
            <a class="text-color-3" href="">
              echoesofpallets.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
