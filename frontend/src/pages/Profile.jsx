import MainLayout from "../layouts/MainLayout";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <MainLayout>
      <div className="page-container">
        <h2>Profile</h2>

        <h4>Name: {user?.name}</h4>

        <h4>Email: {user?.email}</h4>
      </div>
    </MainLayout>
  );
}

export default Profile;