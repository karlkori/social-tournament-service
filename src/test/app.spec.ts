import chai = require("chai");
import app from "../app";
import * as supertest from "supertest";
import config from "../config/app";

let request = supertest.agent(app.server.listen(config.port));
let expect = chai.expect;

before(async () => {
  await app.bootstrap();
});

describe("App controller", () => {
    describe("expects http status 204", () => {
        it("/reset", async () => {
            let response: supertest.Response = await request.post("/reset");
            expect(response.status).to.equal(204);
            expect(response.body).to.be.empty;
        });
    });
});

describe("Player controller", () => {
  describe("/balance", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.get("/balance");
      expect(response.status).to.equal(400);
    });
  });

  describe("/fund?playerId=P1", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P1"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/fund?playerId=P1&points=-100", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P1&points=-100"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/fund?playerId=P1&points=INCORECT", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P1&points=INCORECT"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/fund?playerId=P1&points=100", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P1&points=100"
      );
      expect(response.status).to.equal(204);
    });
  });

  describe("/balance?playerId=P1", () => {
    it("expects http status 200", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(100);
    });
  });

  describe("/balance?playerId=UNKNOWN", () => {
    it("expects http status 404", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=UNKNOWN"
      );
      expect(response.status).to.equal(404);
    });
  });

  describe("/fund?playerId=P1&points=150", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P1&points=150"
      );
      expect(response.status).to.equal(204);
    });
  });

  describe("/fund?playerId=P1&points=100.5", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P1&points=100.5"
      );
      expect(response.status).to.equal(400);
    });

    it("expects balance is 250", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(250);
    });
  });

  describe("/take?playerId=P1&points=255", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/take?playerId=P1&points=255"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/take?playerId=P1&points=INCORECT", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/take?playerId=P1&points=INCORECT"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/take?playerId=P1&points=50", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/take?playerId=P1&points=50"
      );
      expect(response.status).to.equal(204);
    });

    it("expects balance is 200", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(200);
    });
  });

  describe("/fund?playerId=P2&points=100", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P2&points=100"
      );
      expect(response.status).to.equal(204);
    });

    it("expects balance is 100", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P2"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P2");
      expect(response.body.balance).to.equal(100);
    });
  });

  describe("/fund?playerId=P3&points=100", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P3&points=100"
      );
      expect(response.status).to.equal(204);
    });

    it("expects balance is 100", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P3"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P3");
      expect(response.body.balance).to.equal(100);
    });
  });

  describe("/fund?playerId=P4&points=10", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P4&points=10"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance is 10", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P4"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P4");
      expect(response.body.balance).to.equal(10);
    });
  });
});

describe("Tournament controller", () => {
  describe("/announceTournament?tournamentId=T1&deposit=INCORECT", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/announceTournament?tournamentId=T1&deposit=INCORECT"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/announceTournament?tournamentId=T1&deposit=1000", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/announceTournament?tournamentId=T1&deposit=1000"
      );
      expect(response.status).to.equal(204);
    });
  });

  describe("/announceTournament?tournamentId=T1&deposit=1000", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/announceTournament?tournamentId=T1&deposit=1000"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/resultTournament - tournament is not finished", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({ winners: [{ playerId: "P1", prize: 10000 }] });
      expect(response.status).to.equal(400);
    });
  });

  describe("/resultTournament - tournament not found", () => {
    it("expects http status 404", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "UNKNOWN",
          winners: [{ playerId: "P1", prize: 10000 }]
        });
      expect(response.status).to.equal(404);
    });
  });

  describe("/joinTournament", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post("/joinTournament");
      expect(response.status).to.equal(400);
    });
  });

  describe("/joinTournament?tournamentId=T1 - playerId is required", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T1"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/joinTournament?tournamentId=T1&playerId=UNKNOWN - do not find all participants", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T1&playerId=UNKNOWN"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/joinTournament?tournamentId=T1&playerId=P1 - not enough points to join the tournament", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T1&playerId=P1"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/announceTournament?tournamentId=T2&deposit=200", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/announceTournament?tournamentId=T2&deposit=200"
      );
      expect(response.status).to.equal(204);
    });
  });

  describe("/joinTournament?tournamentId=T2&playerId=P1", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T2&playerId=P1"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance is 0", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(0);
    });
  });

  describe("/resultTournament - winner not found", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T2",
          winners: [{ playerId: "P2", prize: 10000 }]
        });
      expect(response.status).to.equal(400);
    });
  });

  describe("/resultTournament - one of winners not found", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T2",
          winners: [
            { playerId: "P1", prize: 10000 },
            { playerId: "P2", prize: 10000 }
          ]
        });
      expect(response.status).to.equal(400);
    });
    it("expects balance of exist winner is not changed due to wrong another winner", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(0);
    });
  });

  describe("/resultTournament", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T2",
          winners: [{ playerId: "P1", prize: 1000 }]
        });
      expect(response.status).to.equal(204);
    });
    it("expects balance is 1000", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(1000);
    });
  });

  describe("/resultTournament - tournament is finished", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T2",
          winners: [{ playerId: "P1", prize: 1000 }]
        });
      expect(response.status).to.equal(400);
    });
  });

  describe("/announceTournament?tournamentId=T3&deposit=200", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/announceTournament?tournamentId=T3&deposit=200"
      );
      expect(response.status).to.equal(204);
    });
  });

  describe("/joinTournament?tournamentId=T3&playerId=P1", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T3&playerId=P1"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance is 800", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(800);
    });
  });

  describe("/joinTournament?tournamentId=T3&playerId=P2&backerId=P3", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T3&playerId=P2&backerId=P3"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance of P2 is 0", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P2"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P2");
      expect(response.body.balance).to.equal(0);
    });
    it("expects balance of P3 is 0", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P3"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P3");
      expect(response.body.balance).to.equal(0);
    });
  });

  describe("/joinTournament?tournamentId=T3&playerId=P4 - not enough points to join", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T3&playerId=P4"
      );
      expect(response.status).to.equal(400);
    });
  });

  describe("/resultTournament", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T3",
          winners: [{ playerId: "P2", prize: 555 }]
        });
      expect(response.status).to.equal(204);
    });
    it("expects balance of P1 is 800", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(800);
    });
    it("expects balance of P2 is 277", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P2"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P2");
      expect(response.body.balance).to.equal(277);
    });
    it("expects balance of P3 is 277", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P3"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P3");
      expect(response.body.balance).to.equal(277);
    });
  });

  describe("/fund?playerId=P4&points=100", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/fund?playerId=P4&points=100"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance is 110", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P4"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P4");
      expect(response.body.balance).to.equal(110);
    });
  });

  describe("/announceTournament?tournamentId=T4&deposit=300", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/announceTournament?tournamentId=T4&deposit=300"
      );
      expect(response.status).to.equal(204);
    });
  });

  describe("/joinTournament?tournamentId=T4&playerId=P1", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T4&playerId=P1"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance is 500", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(500);
    });
  });

  describe("/joinTournament?tournamentId=T4&playerId=P4&backerId=P2&backerId=P3", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request.post(
        "/joinTournament?tournamentId=T4&playerId=P4&backerId=P2&backerId=P3"
      );
      expect(response.status).to.equal(204);
    });
    it("expects balance of P2 is 177", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P2"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P2");
      expect(response.body.balance).to.equal(177);
    });
    it("expects balance of P3 is 177", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P3"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P3");
      expect(response.body.balance).to.equal(177);
    });
    it("expects balance of P4 is 10", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P4"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P4");
      expect(response.body.balance).to.equal(10);
    });
  });

  describe("/resultTournament - backer cannot be set as a winner", () => {
    it("expects http status 400", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T4",
          winners: [{ playerId: "P3", prize: 3333 }]
        });
      expect(response.status).to.equal(400);
    });
    it("expects balance of P1 is 500", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(500);
    });
    it("expects balance of P2 is 177", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P2"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P2");
      expect(response.body.balance).to.equal(177);
    });
    it("expects balance of P3 is 177", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P3"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P3");
      expect(response.body.balance).to.equal(177);
    });
    it("expects balance of P4 is 10", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P4"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P4");
      expect(response.body.balance).to.equal(10);
    });
  });

  describe("/resultTournament - backer cannot be set as a winner", () => {
    it("expects http status 204", async () => {
      let response: supertest.Response = await request
        .post("/resultTournament")
        .send({
          tournamentId: "T4",
          winners: [{ playerId: "P4", prize: 370 }]
        });
      expect(response.status).to.equal(204);
    });
    it("expects balance of P1 is 500", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P1"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P1");
      expect(response.body.balance).to.equal(500);
    });
    it("expects balance of P2 is 300", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P2"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P2");
      expect(response.body.balance).to.equal(300);
    });
    it("expects balance of P3 is 300", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P3"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P3");
      expect(response.body.balance).to.equal(300);
    });
    it("expects balance of P4 is 133", async () => {
      let response: supertest.Response = await request.get(
        "/balance?playerId=P4"
      );
      expect(response.status).to.equal(200);
      expect(response.body.playerId).to.equal("P4");
      expect(response.body.balance).to.equal(133);
    });
  });
});
