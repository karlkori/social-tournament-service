import * as Router from "koa-router";
import PlayerController from "../api/controllers/PlayerController";
import TournamentController from "../api/controllers/TournamentController";
import AppController from "../api/controllers/AppController";

let router = new Router({
  prefix: ""
});

router.post("/reset", AppController.reset);

router.post("/take", PlayerController.take);
router.post("/fund", PlayerController.fund);
router.get("/balance", PlayerController.balance);

router.post("/announceTournament", TournamentController.announceTournament);
router.post("/joinTournament", TournamentController.joinTournament);
router.post("/resultTournament", TournamentController.resultTournament);

export default router;
