<template>
  <div class="bg-primary">
    <div class="container">
      <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
        <router-link class="navbar-brand" to="/">者也专栏</router-link>
        <ul v-if="!user" class="list-inline mb-0">
          <li class="list-inline-item">
            <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
          </li>
          <li class="list-inline-item">
            <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
          </li>
        </ul>
        <ul v-else class="list-inline mb-0">
          <li class="list-inline-item">
            <Dropdown :title="`你好 ${user.name}`">
              <DropdownItem>
                <router-link to="/post/add">新建文章</router-link>
              </DropdownItem>
              <DropdownItem disabled>
                <a>编辑资料</a>
              </DropdownItem>
              <DropdownItem>
                <a @click="handleLogout">退出登录</a>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import DropdownItem from '@/components/DropdownItem.vue';
import { useStore } from '@/store';
import { AccountActions } from '@/store/modules/account/types';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem,
  },
  setup() {
    // data ========================================================================================================================
    const store = useStore();

    const router = useRouter();

    const route = useRoute();

    // computed ========================================================================================================================
    const user = computed(() => store.state.account.user);

    // method ========================================================================================================================
    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      store.dispatch(AccountActions.UPDATE_USER, null);

      if (route.meta?.requiredLogin) {
        router.replace({
          name: 'Login',
        });
      }
    };

    return {
      user,
      handleLogout,
    };
  },
});
</script>
