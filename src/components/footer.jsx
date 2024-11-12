import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white border border-gray-200 shadow-2xl mt-10">
      <div className="container px-6 py-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl ">
              Subscribe our newsletter to get update.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Email Address"
              />

              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Quick Link</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Home
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Who We Are
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Our Philosophy
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Industries</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Retail & E-Commerce
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Information Technology
              </a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">
                Finance & Insurance
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-4" />

        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-12 hover:scale-105 transition duration-300 hover:cursor-pointer ease-in-out " src={Logo} alt="Logo" />
          </a>

          <div className="flex -mx-2">
            <a href="#" className="mx-2 text-black transition-colors duration-300 hover:text-gray-500" aria-label="Reddit">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.5 13.216C13.5006 12.9539 13.5428 12.6957 13.629 12.46C13.8379 12.01 14.3214 11.91 14.758 12.118C15.1851 12.3104 15.2798 12.7571 15.0702 13.1847C14.8296 13.6364 14.1718 13.7382 13.719 13.498C13.7413 13.399 13.7144 13.2921 13.645 13.1995C13.5966 13.1215 13.5374 13.0482 13.467 13.0003C13.4231 12.9715 13.3789 12.9415 13.335 12.911C13.2677 12.8592 13.1971 12.8148 13.124 12.781L12.92 12.786L12.653 12.619L12.451 12.548L11.869 13.124L12.218 13.345L13.307 13.161L12.5 12.72L12.432 13.1812L13.1106 14.0898L14.307 14.08Z" />
              </svg>
            </a>

            <a href="#" className="mx-2 text-blue-400 transition-colors duration-300 hover:text-blue-700" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.444 4.832c-.844.373-1.748.624-2.692.734.97-.577 1.719-1.492 2.072-2.583-.907.537-1.91.92-2.976 1.128-.853-.909-2.07-1.476-3.334-1.476-2.524 0-4.56 2.038-4.56 4.56 0 .357.036.705.105 1.04-3.785-.19-7.14-2.001-9.388-4.755-.393.67-.618 1.448-.618 2.274 0 1.57.8 2.953 2.01 3.761-.742-.022-1.44-.227-2.045-.565v.057c0 2.191 1.554 4.025 3.623 4.44-.381.103-.782.161-1.195.161-.294 0-.582-.029-.863-.085.582 1.809 2.265 3.133 4.25 3.173-1.563 1.22-3.537 1.948-5.678 1.948-.369 0-.73-.021-1.089-.064 2.02 1.292 4.42 2.043 6.984 2.043 8.382 0 13.029-6.93 13.029-12.98 0-.196 0-.39-.015-.584.897-.647 1.673-1.463 2.293-2.398z" />
                </svg>
            </a>

            <a href="#" className="mx-2 text-blue-600 transition-colors duration-300 hover:text-blue-800 " aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.451 20.451H16.568v-5.319c0-1.269-.026-2.91-1.773-2.91-1.773 0-2.046 1.387-2.046 2.818v5.411h-3.979V9.083h3.815v2.436h.054c.533-.994 1.829-2.044 3.743-2.044 4.003 0 4.734 2.638 4.734 6.08v6.184zM6.389 7.968c-1.314 0-2.384-1.07-2.384-2.384 0-1.314 1.07-2.384 2.384-2.384s2.384 1.07 2.384 2.384c0 1.314-1.07 2.384-2.384 2.384zM4.4 20.451h3.979v-10.367H4.4v10.367zM9.809 9.084h3.976v1.96H9.809v-1.96z" />
                </svg>
            </a>

            <a href="#" className="mx-2 text-blue-900 transition-colors duration-300 hover:text-blue-950" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24h11.496v-9.293H9.563v-3.623h3.258V9.26c0-3.267 1.878-5.085 5.046-5.085 1.463 0 2.975.14 3.358.206v3.59h-2.121c-1.664 0-2.027.791-2.027 1.937v2.51h4.054l-.526 3.623h-3.528v9.293h6.907c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
            </a>

            <a href="#" className="mx-2 text-pink-600 transition-colors duration-300 hover:text-pink-800" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.215 0 3.594.012 4.869.07 1.28.059 2.166.271 2.68.566a4.837 4.837 0 0 1 1.731 1.731c.295.514.507 1.4.566 2.68.058 1.275.07 1.654.07 4.869s-.012 3.594-.07 4.869c-.059 1.28-.271 2.166-.566 2.68a4.837 4.837 0 0 1-1.731 1.731c-.514.295-1.4.507-2.68.566-1.275.058-1.654.07-4.869.07s-3.594-.012-4.869-.07c-1.28-.059-2.166-.271-2.68-.566a4.837 4.837 0 0 1-1.731-1.731c-.295-.514-.507-1.4-.566-2.68-.058-1.275-.07-1.654-.07-4.869s.012-3.594.07-4.869c.059-1.28.271-2.166.566-2.68a4.837 4.837 0 0 1 1.731-1.731c.514-.295 1.4-.507 2.68-.566 1.275-.058 1.654-.07 4.869-.07zM12 0C8.741 0 8.334.013 7.046.072a6.322 6.322 0 0 0-2.198.453c-.796.371-1.465.94-2.072 1.546a6.35 6.35 0 0 0-1.546 2.072c-.375.727-.58 1.518-.453 2.198C.013 8.334 0 8.741 0 12c0 3.259.013 3.667.072 4.954.059.68.271 1.472.453 2.198.371.796.94 1.465 1.546 2.072a6.322 6.322 0 0 0 2.072 1.546c.727.375 1.518.58 2.198.453C8.334 23.987 8.741 24 12 24c3.259 0 3.667-.013 4.954-.072a6.322 6.322 0 0 0 2.198-.453c.796-.371 1.465-.94 2.072-1.546a6.35 6.35 0 0 0 1.546-2.072c.375-.727.58-1.518.453-2.198-.059-.68-.271-1.472-.453-2.198C23.987 15.667 24 15.259 24 12c0-3.259-.013-3.667-.072-4.954-.059-.68-.271-1.472-.453-2.198a4.837 4.837 0 0 0-1.731-1.731c-.514-.295-1.4-.507-2.68-.566C15.594.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 9.107a3.195 3.195 0 1 1 0-6.391 3.195 3.195 0 0 1 0 6.391zm5.906-7.454a1.439 1.439 0 1 1 0-2.878 1.439 1.439 0 0 1 0 2.878z" />
                </svg>
            </a>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
