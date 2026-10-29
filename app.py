
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

DISCORD_INVITE = "https://discord.gg/tqSqTCh8R"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/guides")
def guides():
    return render_template("gd.html")


@app.route("/weapons")
def weapons():
    return render_template("weapons.html")


@app.route("/jsg")
def jsg():
    return render_template("jsg.html")


@app.route("/join-squad", methods=["POST"])
def join_squad():
    player_name = request.form.get("player_name", "").strip()
    player_level = request.form.get("player_level", "").strip()
    game_mode = request.form.get("game_mode", "").strip()
    player_role = request.form.get("player_role", "").strip()

    if not all([player_name, player_level, game_mode, player_role]):
        return "Please complete all fields.", 400

    try:
        level = int(player_level)
    except ValueError:
        return "Invalid player level.", 400

    if not 1 <= level <= 400:
        return "Player level must be between 1 and 400.", 400

    if game_mode not in ("multiplayer", "battle-royale", "both"):
        return "Invalid game mode.", 400

    if player_role not in ("assault", "sniper", "support", "leader"):
        return "Invalid player role.", 400

    return redirect(DISCORD_INVITE)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
