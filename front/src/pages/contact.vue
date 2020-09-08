<template>
  <v-app>
    <div class="contact">
      <div id="contact-form" class="contact-form">
        <div v-if="isSending" class="loading">Sending...</div>
        <h1 class="contact-title">Contact</h1>
        <div class="contact-text">
          <p>Want to be a part of this project or just report a bug ? You have feedbacks or even good ideas for the app ? You're a professional and want to work with us ?</p>
          <p>Feel free to contact us.</p>
          <p>We are trying to be available and respond within 5 days.</p>
        </div>
        <div class="separator"></div>
        <div class="form-container">
          <form class="form" @submit="onSubmit">
            <input
              required
              name="name"
              v-model="contact.name"
              placeholder="Name"
              type="text"
              autocomplete="off"
            />
            <input
              required
              name="email"
              v-model="contact.email"
              placeholder="E-mail"
              type="email"
              autocomplete="off"
            />
            <textarea name="message" v-model="contact.message" rows="4" placeholder="Message"></textarea>
            <button class="button">Send</button>
          </form>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        name: "",
        email: "",
        message: "",
      },

      isSending: false,
    };
  },
  methods: {
    clearForm() {
      for (let field in this.contact) {
        this.contact[field] = "";
      }
    },
    onSubmit(evt) {
      evt.preventDefault();

      this.isSending = true;

      setTimeout(() => {
        // Build for data
        let form = new FormData();
        for (let field in this.contact) {
          form.append(field, this.contact[field]);
        }

        // Send form to server TODO
        // this.$http
        //   .post("/app.php", form)
        //   .then((response) => {
        //     console.log(response);
        //     this.clearForm();
        //     this.isSending = false;
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  height: 100%;
  display: flex;
  align-items: center;
  background-image: url("../assets/contact/contact.svg");
  background-position: center top;
  background-size: 40%;
}

.contact-form {
  font-family: 16px;
  margin: 0 auto;
  max-width: 1140px;
  width: 100%;
  color: white;
}
.contact-title,
.contact-text,
.form-container {
  min-height: fit-content;
}

.contact-title {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 36px;
}

.contact-text {
  font-size: 21px;
}

.form-container {
  max-width: 600px;
  margin: auto;
}

.contact-form .separator {
  border-bottom: solid 1px #ccc;
  margin-bottom: 15px;
}

.contact-form .form {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea {
  border: solid 1px #e8e8e8;
  padding: 10px 7px;
  margin-bottom: 15px;
  outline: none;
  color: white;
}

.contact-form textarea {
  resize: none;
}

.contact-form .button {
  background: #4392f1;
  border: solid 1px #4392f1;
  color: white;
  cursor: pointer;
  padding: 10px 50px;
  text-align: center;
  text-transform: uppercase;
}

.contact-form .button:hover {
  background: #4798fc;
  border: solid 1px #4798fc;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea,
.contact-form .button {
  font-size: 15px;
  border-radius: 3px;
}

@media (min-width: 576px) {
  .contact-form {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .contact-form {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .contact-form {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .contact-form {
    max-width: 1140px;
  }
}
</style>