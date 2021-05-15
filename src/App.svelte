<script>
    const saveAs = require('file-saver');
    let laserPromise;
    const host = process.env.HOST;
    let search = e => {
        e.preventDefault();
        laserPromise = fetch(`${host}/`).then(res => {
            console.log("api awake. Laserifying");
            const formData  = new FormData();
            const fileSelector = document.getElementById('image');
            formData.append('image', fileSelector.files[0]);
            return fetch(`${host}/laserify`, {
                method: "post",
                body: formData,
            }).then(res => res.blob())
            .then(blob => saveAs(blob, 'laser-eyes.jpg')) //TODO: get filename from Content-Disposition
        })
    }
</script>

<style>
    form {
        height: 100%;
    }
    input {
        display: block;
        margin: 8px;
    }
    button {
        position: relative;
        width: 240px;
        background: rgba(0, 190, 190, 0.2);
        border: 1px solid #00bebe;
        margin: 20px;
        padding: 5px 27px;
        cursor: pointer;
        color: #00bebe;
        font-weight: 500;
        transition: .3s;
        text-transform: uppercase;
        font-size: 24px;
        overflow: hidden;
        outline: none;
    }
    button:hover{
        box-shadow: 0 0 25px #00dcdc, 0 1px 5px #212121;
        border-color: #00dcdc;
        background:  rgba(0, 190, 190, 0.2);
    }
</style>

<form>
    <input type="file" name="image" id="image">
    <button on:click={search}>Laserify</button>
</form>
{#if laserPromise}
  {#await laserPromise}
    <img src="dab.gif" alt="dab" />
    <div class="msg">Laserifying</div>
  {:then res}
    <div>Your picture has been downloaded</div>
  {:catch err}
    {err}
  {/await}
{/if}