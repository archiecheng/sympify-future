<template>
  <div>
    <h1>Add User</h1>
    <input v-model="name" placeholder="Enter name" />
    <input v-model="age" type="number" placeholder="Enter age" />
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
import { db } from '@/utils/firebase';  // Make sure the path is correct

import { collection, addDoc } from 'firebase/firestore';  // Import necessary Firestore methods


export default {
  data() {
    return {
      name: '',
      age: null
    };
  },
  methods: {
    async addUser() {
      try {
        await addDoc(collection(db, 'users'), {
          name: this.name,
          age: this.age
        });
        alert('User added successfully');
        this.name = '';
        this.age = null;
      } catch (error) {
        console.error('Error adding user: ', error);
      }
    }
  }
};

</script>
