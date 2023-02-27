<template>
  <div class="user-list text-center">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(user, index) in users.data" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <Bootstrap5Pagination :data="users" @pagination-change-page="getUsers" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
  name: 'UserList',
  components: { Bootstrap5Pagination },
  setup() {
    const users = ref({ data: [] });

    const getUsers = async (page = 1) => {
      try {
        const response = await axios.get(`/users?page=${page}`);
        users.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();

    return { users, getUsers };
  },
};
</script>

<style>
.user-list {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px #1f4a7c;
}
</style>