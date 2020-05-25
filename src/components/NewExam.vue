<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, open }">
        <v-btn color="primary" @click="start(open)" dark v-on="on">Create New Exam</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New Exam</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveExam()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="subject" label="Subject Name*" hint="name of the original subject" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="professor" label="Professor Name*" hint="full name" required></v-text-field>
              </v-col>
              <v-col cols="6" lg="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Date"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
                <p>Date in ISO format: <strong>{{ date }}</strong></p>
              </v-col>
              <v-col cols="6" sm="5">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import firebase from "./../firebaseInit";
const db = firebase.firestore();
  export default {
    data: vm => {
      return {
        dialog: false,
        notifications: false,
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        sound: true,
        widgets: false,
        menu1: false,
        time: null,
        menu2: false,
        modal2: false,
        subject: null,
        professor: null
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      start: function() {
        setTimeout(() => this.dialog = true);
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      saveExam() {
        if (this.subject != "") {
          db.collection("exams")
            .add({ date: this.date, time: this.time, subject: this.subject, professor: this.professor })
            .then(() => {
              console.log("Document successfully written!");
              this.readEmployees();
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          this.subject = "";
          this.dialog = false
        }
        else {
          this.dialog = false
        }
    },
    },
  }
</script>