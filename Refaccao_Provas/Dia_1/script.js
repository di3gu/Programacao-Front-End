<script>
function mostrarImagem() {

    if (document.getElementById("imgTabela")) {
        return;
    }

    let img = document.createElement("img");
    img.src = "Prova/Tabela_Jogos.png";
    img.id = "imgTabela";

    document.body.appendChild(img);
}
</script>