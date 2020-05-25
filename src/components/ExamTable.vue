<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Subject</th>
          <th class="text-left">Professor</th>
          <th class="text-left">Date</th>
          <th class="text-left">Time</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in exams" :key="item.id">
          <td>{{ item.subject }}</td>
          <td>{{ item.professor }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>
            <v-btn class="mx-2" fab dark small color="pink">
                    <v-icon dark>mdi-heart</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import firebase from "./../firebaseInit";
const db = firebase.firestore();
export default {
  name: 'examtable',
  data () {
    return {
      exams: []
    }
  },
  methods: {
    createEmployee(name, date) {
      if (name != "") {
        db.collection("exams")
          .add({ date: date, subject: name })
          .then(() => {
            console.log("Document successfully written!");
            this.readEmployees();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        this.name = "";
      }
    },
    readEmployees() {
      this.exams = [];
      db.collection("exams")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.exams.push({
              id: doc.id,
              subject: doc.data().subject,
              professor: doc.data().professor,
              date: doc.data().date,
              time: doc.data().time,
            });
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    updateEmployee(id, name, date) {
      db.collection("employees")
        .doc(id)
        .update({
          name: name,
          date: date,
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.readEmployees();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteEmployee(id) {
      db.collection("employees")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.readEmployees();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    this.readEmployees();
  },
};
</script>