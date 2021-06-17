<script>
    const saveAs = require('file-saver');
    let laserPromise;
    const host = process.env.HOST;
    let files = []
    let search = e => {
        e.preventDefault();
        if (!files[0]) {
            laserPromise = Promise.reject("Please select an image to laserify");
            return;
        }
        laserPromise = fetch(`${host}/api`).then(res => {
            console.log("api awake. Laserifying");
            const formData  = new FormData();
            formData.append('image', files[0]);
            return fetch(`${host}/api/laserify`, {
                method: "post",
                body: formData,
            })
            .then(async res => {
                if (!res.ok) {
                    throw `Error: ${(await res.json()).error}`;
                } else {
                    return res;
                }
            })
            .then(res => res.blob())
            .then(blob => saveAs(blob, 'laser-eyes.jpg')) //TODO: get filename from Content-Disposition
        })
    }
</script>

<style>
    input {
        display: block;
        margin: 8px auto;
    }
    button {
        position: relative;
        display: block;
        width: 240px;
        background: rgba(0, 190, 190, 0.2);
        border: 1px solid #00bebe;
        margin: 20px auto;
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
    div {
        text-align: center;
    }
    img {
        display: block;
        margin: 0 auto;
    }

    .upload-label {
        border: 1px solid #00bebe;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
    .upload-label:hover {
        box-shadow: 0 0 25px #00dcdc, 0 1px 5px #212121;
        border-color: #00dcdc;
        background:  rgba(0, 190, 190, 0.2);
    }
</style>

<h1>Automatic🧠 laser⚡ eyes👀</h1>
<form>
    <label for="image" class="upload-label">
        <span>Click here to choose an image</span>
        {#if files[0]}
            <span>(Currently using {files[0].name})</span>
        {/if}
    </label>
    <input type="file" name="image" id="image" style="display: none;" bind:files>
    <button on:click={search}>Laserify</button>
</form>
{#if laserPromise}
  {#await laserPromise}
    <img src="dab.gif" alt="dab" />
    <div class="msg">Laserifying</div>
  {:then res}
    <div>Your picture has been downloaded</div>
  {:catch err}
    <div>{err}</div>
  {/await}
{/if}
<div style="margin-top: 5px; text-align: inherit">
    <a href="https://twitter.com/themacrochip" target="_blank">Made by Chip Thien</a>
</div>
