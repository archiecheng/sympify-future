<template>
  <div>
    <h1>Add User</h1>
    <input v-model="name" placeholder="Enter name" />
    <input v-model="age" type="number" placeholder="Enter age" />
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
import { db } from '@/utils/firebase';  // 确保路径正确
import { collection, addDoc } from 'firebase/firestore';  // 导入必要的 Firestore 方法

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
