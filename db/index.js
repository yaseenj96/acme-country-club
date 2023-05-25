const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
//if we want to deploy our database we will need to specify to check for the db connection string in an environment variable. If the environment variable is empty then use our hard coded connection string
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/acme_country_club_db`,
  {
    logging: false, // so we don't see all the SQL queries getting made
  }
);

const commonAttr = {
  id: {
    type: UUID,
    primaryKey: true,
    //default value is needed for Sequelize to automatically create the UUID primary key
    defaultValue: UUIDV4,
  },
};

//create table model for Member
const Member = db.define("member", {
  ...commonAttr,
  name: {
    type: STRING(20),
  },
});

//create table model for Facility
const Facility = db.define("facility", {
  ...commonAttr,
  name: {
    type: STRING(20),
  },
});

//create table model for Booking
const Booking = db.define("booking", {
  ...commonAttr,
});

//Make associations
Member.belongsTo(Member, { as: "sponsor" });
Member.hasMany(Member, { as: "sponsoredBy", foreignKey: "sponsorId" });

Booking.belongsTo(Member);
Member.hasMany(Booking);

Booking.belongsTo(Facility);
Facility.hasMany(Booking);

module.exports = {
  db,
  Member,
  Booking,
  Facility,
};
