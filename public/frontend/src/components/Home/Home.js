

const Home = () => {
  return (
    <section className="home-section py-4 py-lg-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex h-100 align-items-center">
              <div>
                <h1 className="text-center text-lg-start">Store App</h1>
                <p>
                  Hej :) ten projekt nie jest całkiem skończony, ponieważ w&nbsp;procesie nauki dodaję coś nowego.
                </p>
                <p>
                  To&nbsp;jest fullstack aplikacja napisana na&nbsp;React, Node.js (Express) i&nbsp;MongoDB. I&nbsp;rozmieszczona na&nbsp;serwerze skonfigurowanym za&nbsp;pomocą Nginx. Link na&nbsp;kod znajduje się w&nbsp;hederze.
                </p>
                <p>
                  W&nbsp;tym momencie jest zrealizowane filtry, szybkie wyszukiwanie po&nbsp;nazwie, funkcjonał koszyka, logowanie za&nbsp;pomocą JsonWebToken itp.. A&nbsp;także zamiast admin panelu jest po&nbsp;prostu formularz dla utworzenia nowego produktu w&nbsp;bazie danych.
                </p>
                <p>
                  Z&nbsp;poważaniem, <a href="https://ksprojects.pl/">Kirill Suranov</a>.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 order-first order-lg-last mb-3 mb-lg-0">
            <div className="d-flex justify-content-center">
              <img src="./home-img.svg" alt="home" className="img img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home