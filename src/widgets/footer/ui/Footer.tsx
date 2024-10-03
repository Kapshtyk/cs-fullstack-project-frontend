import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__heading">Crazy Shop</h2>
      <div className="footer__address">
        <p>123 Fake Street</p>
        <p>Springfield, IL 62701</p>
        <p>United States</p>
        <p>Phone: 555-555-5555</p>
      </div>
      <p className="footer__copy">
        {new Date().getFullYear()} &copy; Crazy Shop
      </p>
    </footer>
  );
};
