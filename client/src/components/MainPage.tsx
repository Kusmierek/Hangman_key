import { useState } from 'react';
import Game from './Game';

const MainPage = () => {
  return (
    <section className="main">
      <div className="px-6 py-12 md:px-12 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 flex items-center">
            <div className="mt-12 lg:mt-0">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 color: hsl(218, 81%, 95%)">
                Have Fun <br />
                <span className="color: hsl(218, 81%, 75%);">
                  and play Hangman!!!
                </span>
              </h1>
              <a
                className="nav-button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                href="#!"
                role="button"
              >
                Play
              </a>
            </div>
            <div className="mb-12 lg:mb-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/43/43980.png"
                className="w-full rounded-lg "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
