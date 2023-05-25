const express = require("express");
const server = express();
const PORT = 8000;
const { Member, Facility, Booking } = require("./db/index");
// //router imports
// const router = require("./router");

//middlewares
server.use(express.json());

// //1. combine routes into one router so that we can do server.use('/api', router) and the router has both the pageRouter and contentRouter within it
// server.use("/api", router);

server.get("/api/facilities", async (req, res) => {
  try {
    const facilities = await Facility.findAll({});
    res.json(facilities);
  } catch (error) {
    console.log("Error getting facilities");
    res.status(500).json({ message: "Error getting facilities", error });
  }
});

server.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Member, as: "member" },
        { model: Facility, as: "facility" },
      ],
    });
    res.json(bookings);
  } catch (error) {
    console.log("Error getting facilities");
    res.status(500).json({ message: "Error getting facilities", error });
  }
});

server.get("/api/members", async (req, res) => {
  try {
    const members = await Member.findAll({
      include: [{ model: Member, as: "sponsor" }],
      include: [{ model: Member, as: "sponsoredBy" }],
    });
    res.json(members);
  } catch (error) {
    console.log("Error getting facilities");
    res.status(500).json({ message: "Error getting facilities", error });
  }
});

// server.get("/", (req, res) => {
//   res.json({ server: "working" });
// });

server.listen(PORT, () => {
  console.log(`Server is listening on localhost:${PORT}`);
});
