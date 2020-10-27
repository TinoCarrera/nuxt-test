<template>
    <div>
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-3 gap-4 m-4">
                <div
                    class="max-w-sm rounded overflow-hidden shadow-lg"
                    v-for="article in displayedArticles"
                    :key="article._id"
                >
                    <img class="w-full rounded-md" v-bind:src="article.imageURL" />
                    <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{{ article.title }}</div>
                    <p class="text-gray-700 text-base">{{ article.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mx-auto px-4 inline-flex flex justify-center mb-6">
            <button
                type="button"
                v-if="page != 1"
                @click="page--"
                class="btn btn-gray rounded-l"
            >
                Previous
            </button>
            <button
                type="button"
                v-for="pageNumber in pages.slice(page - 1, page + 8)"
                :key="pageNumber"
                @click="page = pageNumber"
                class="btn btn-gray rounded-l"
            >
                {{ pageNumber }}
            </button>
            <button
                type="button"
                v-if="page < pages.length"
                @click="page++"
                class="btn btn-gray rounded-r"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
      baseURL: "http://190.74.78.214:3000",
      page: 1,
      perPage: 9,
      pages: [],
    };
  },

  created() {
    this.getArticles();
  },

  methods: {
    async getArticles() {
      try {
        const res = await axios.get(`${this.baseURL}/article`);
        this.articles = res.data.articles;
      } catch (error) {
        console.log(error);
      }
    },

    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return articles.slice(from, to);
    },

    setArticles() {
      let numberOfPages = Math.ceil(this.articles.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
  },

  computed: {
    displayedArticles() {
      return this.paginate(this.articles);
    },
  },

  watch: {
    articles() {
      this.setArticles();
    },
  },
};
</script>

<style>
.btn {
  @apply font-bold py-2 px-4;
}

.btn-gray {
  @apply bg-gray-200 text-gray-700;
}

.btn-gray:hover {
  @apply bg-gray-300;
}
</style>