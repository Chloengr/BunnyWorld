<template>
  <section>
    <h1>{{ msg }}</h1>
    <div>
      <h1 class="has-text-primary">Les typo</h1>
      <h1>Title</h1>
      <p>Mon paragraphe</p>
      <small>Mon pti texte</small>
      <a>Coucou petit lien</a>
    </div>
    <div>
      <h1 class="has-text-primary">Une box</h1>
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="Image"
              />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>John Smith</strong>
                <small class="has-text-primary">@johnsmith</small>
                <small>31m</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                efficitur sit amet massa fringilla egestas. Nullam condimentum
                luctus turpis.
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="reply">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="retweet">
                  <span class="icon is-small">
                    <i class="fas fa-retweet" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
    <div>
      <h1 class="has-text-primary">Les boutons</h1>
      <button class="button is-rounded"><a>Rounded</a></button>
      <button class="button is-primary is-rounded">Rounded</button>
      <button class="button is-white is-rounded">Rounded</button>
    </div>
    <div>
      <h1 class="has-text-primary">Les trucs de formulaire</h1>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <b-checkbox :value="true" type="is-primary"> Success </b-checkbox>
      </div>
      <section>
        <div class="block">
          <b-radio
            v-model="radio"
            type="is-primary"
            name="name"
            native-value="Flint"
          >
            Flint
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Silver"
            type="is-avatar-orange"
          >
            Silver
          </b-radio>
          <b-radio v-model="radio" name="name" native-value="Jack">
            Jack
          </b-radio>
          <b-radio v-model="radio" name="name" native-value="Vane" disabled>
            Vane
          </b-radio>
          <p class="has-text-primary">
            Cadeaux pour Maxime : regarde comme j'ai fait pour le radio Silver
          </p>
        </div>
        <b-rate
          v-model="rate"
          :icon-pack="packs"
          :icon="icons"
          :max="maxs"
          :size="sizes"
          :locale="locale"
          :show-score="score"
          :custom-text="custom"
          :show-text="text"
          :texts="texts"
          :rtl="isRtl"
          :spaced="isSpaced"
          :disabled="isDisabled"
        >
        </b-rate>
      </section>
    </div>
    <figure class="image small-icon">
      <img src="/img/king.png" alt="Image" />
    </figure>
    <span>Classe .small-icon</span>
    <figure class="image icon">
      <img src="/img/king.png" alt="Image" />
    </figure>
    <span>Classe .icon</span>
    <figure class="image big-icon">
      <img src="/img/king.png" alt="Image" />
    </figure>
    <span>Classe .big-icon</span>
  </section>
</template>

<script>
export default {
  name: "Components",
  data() {
    return {
      msg: "Components",
      rate: 4,
      maxs: 5,
      sizes: "is-large",
      packs: "fas",
      icons: "heart",
      score: true,
      custom:
        "Cadeau pour Chloé, je comprends pas pourquoi ça décale ça le fait pas sur le buefy il faudra regarder",
      text: false,
      texts: ["Very bad", "Bad", "Good", "Very good", "Awesome"],
      isRtl: false,
      isSpaced: true,
      isDisabled: true,
      locale: undefined // Browser locale
    };
  }
};
</script>
