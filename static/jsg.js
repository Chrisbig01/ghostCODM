
const squadForm = document.getElementById("squad-form");

if (squadForm) {
    squadForm.addEventListener("submit", function (event) {
        const username = document
            .getElementById("player-name")
            .value.trim();

        const level = Number(
            document.getElementById("player-level").value
        );

        const mode = document.getElementById("game-mode").value;
        const role = document.getElementById("player-role").value;
        const message = document.getElementById("squad-message");

        if (
            username.length < 2 ||
            level < 1 ||
            level > 400 ||
            !mode ||
            !role
        ) {
            event.preventDefault();
            message.textContent = "Please check your information.";
        }
    });
}
