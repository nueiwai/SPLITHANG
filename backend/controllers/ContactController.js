// logout controller
export const logout = async (req, res) => {
  try { 
    res.cookie("jwt", "", {
      secure: true,
      sameSite: "None",
      maxAge: 1,
    });
    return res.status(200).send("Logged out successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}
