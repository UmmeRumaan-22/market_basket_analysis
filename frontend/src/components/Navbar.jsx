function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="navbar-custom">
      <h4>
        Welcome,
        {" "}
        {user?.name}
      </h4>
    </div>
  );
}

export default Navbar;