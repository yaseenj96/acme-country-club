const { db, Member, Facility, Booking } = require("./index");

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    console.log("Connected to database");
    const [moe, lucy, ethyl, larry, tennis, pingpong, marbles] =
      await Promise.all([
        Member.create({ name: "moe" }),
        Member.create({ name: "lucy" }),
        Member.create({ name: "ethyl" }),
        Member.create({ name: "larry" }),
        Facility.create({ name: "tennis" }),
        Facility.create({ name: "pingpong" }),
        Facility.create({ name: "marbles" }),
      ]);

    moe.sponsorId = lucy.id;
    lucy.sponsorId = larry.id;

    await Promise.all([moe.save(), lucy.save()]);

    await Promise.all([
      Booking.create({ memberId: lucy.id, facilityId: marbles.id }),
      Booking.create({ memberId: lucy.id, facilityId: marbles.id }),
      Booking.create({ memberId: moe.id, facilityId: tennis.id }),
      //Booking.create({facilityId: pingpong.id }),
    ]);

    db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
};

syncAndSeed();
