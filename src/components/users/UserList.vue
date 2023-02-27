<template>
  <div class="user-list text-center">
    <div class="row">
      <div class="col-md-2">
        <select name="limit" @change="limitChange" class="form-control">
          <option value="10" selected>10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-for="item in paginate.totalPage" :key="item">
            <a class="page-link" @click="changePage(item)">
              {{ item }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<!-- <script>
import { ref } from 'vue';
import axios from 'axios';
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
  name: 'UserList',
  // components: { Bootstrap5Pagination },
  setup() {
    const users = ref({ data: [] });
    const paginate = {
      limit: 2,
      total: 0,
      currentPage: 1,
      totalPage: 1
    };

    const getUsers = async (page = 1) => {
      try {
        const response = await axios.get(`/users?page=${page}`);
        users.value = response.data.data;
        paginate.limit = response.data.per_page;
        paginate.total = response.data.total;
        paginate.currentPage = response.data.current_page;

        paginate.totalPage = Math.ceil(paginate.total / paginate.limit);

      } catch (error) {
        console.error(error);
      }
    };

    getUsers();

    return { users, getUsers };
  },
};
</script> -->

<script>
import axios from "axios";

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      paginate: {
        limit: 10,
        total: 0,
        currentPage: 1,
        totalPage: 1
      }
    }
  },
  methods: {
    getUsers: function (pagination = {}) {
      let $this = this;
      let params = '';
      params += `?page=${this.paginate.currentPage}&limit=${this.paginate.limit}`;
      axios.get('/users'+params).then(function (response) {
        response = response.data
        if (response.status == 'ok') {
          $this.users = response.data.data;
          $this.paginate.currentPage = response.data.current_page;
          $this.paginate.totalPage = Math.ceil(response.data.total / $this.paginate.limit);
        }
      });
    },
    changePage: function(item) {
      this.paginate.currentPage = item;
      this.getUsers();
    },
    limitChange: function(e){
      this.paginate.limit = event.target.value;
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<style>
.user-list {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px #1f4a7c;
}
</style>