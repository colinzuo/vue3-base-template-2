<template>
  <div class="container">
    <div class="toolbar">
      <div class="keyword-input">
        <span>Search</span>
        <el-input
          class="ml-1"
          v-model="keyword"
          placeholder="keyword"
        >
          <template #append>
            <el-button :icon="Search"
              @click="refreshUserList"
              />
          </template>
        </el-input>
      </div>

      <div
        v-if="userStore.isSysAdmin"
        class="select-yesno"
      >
        <span class="ml-3 mr-1">Sysadmin?</span>
        <el-select v-model="optionIsSysAdmin" placeholder="Select">
          <el-option
            v-for="item in optionYesNoItems"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <div
        v-if="userStore.isAdmin"
        class="select-yesno"
      >
        <span class="ml-3 mr-1">Admin?</span>
        <el-select v-model="optionIsAdmin" placeholder="Select">
          <el-option
            v-for="item in optionYesNoItems"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <div class="spacer"></div>

      <el-button
        v-if="userStore.isSysAdmin"
        type="primary" :icon="Plus" @click="userFormDialogVisible = true">New User</el-button>
    </div>

    <el-table :data="userList" border class="table">
      <el-table-column prop="username" label="Username" width="150"></el-table-column>
      <el-table-column prop="email" label="Email" width="200"></el-table-column>
      <el-table-column prop="enabled" label="Enabled" width="80"></el-table-column>
      <el-table-column prop="loginTime" label="LoginTime"></el-table-column>

      <el-table-column label="Actions" width="220" align="center">
        <template #default="scope">
          <el-button v-if="userStore.isSysAdmin"
            text :icon="Edit" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button v-if="userStore.isSysAdmin"
            text :icon="Delete" class="red" @click="handleDelete(scope.$index, scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <div class="spacer"></div>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="totalUsers"
        @current-change="refreshUserList"
      ></el-pagination>
    </div>

    <el-dialog
      v-if="userFormDialogVisible"
      v-model="userFormDialogVisible"
    >
      <UserForm
        :user="editUser"
        @ok="onUserFormDialogOk" @cancel="userFormDialogVisible = false">
      </UserForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus'

import UserForm from '@/components/UserForm.vue';

import { useUserStore } from '@/stores/user';
import { gUserApi } from '@/api';

import type { UmsUserDTO, UmsUserQueryParam } from '@/model/dto/ums';
import { fi } from 'element-plus/es/locale';


const userStore = useUserStore();

const userFormDialogVisible = ref(false);
const loading = ref(false);
const keyword = ref('');
const optionYesNoItems = ['Any', 'Yes', 'No'];
const optionIsSysAdmin = ref('Any');
const optionIsAdmin = ref('Any');
const pageNum = ref(1);
const pageSize = ref(10);
const userList = ref([] as UmsUserDTO[]);
const totalUsers = ref(0);
const editUser = ref<UmsUserDTO>();

watch([userFormDialogVisible], (value) => {
  if (!value) {
    editUser.value = undefined;
  }
})

refreshUserList();

async function refreshUserList() {
  console.log(`refreshUserList`);

  try {
    loading.value = true;

    const queryParam: UmsUserQueryParam = {};

    if (optionIsSysAdmin.value === 'Yes') {
      queryParam.sysAdmin = true;
    } else if (optionIsSysAdmin.value === 'No') {
      queryParam.sysAdmin = false;
    }

    if (optionIsAdmin.value === 'Yes') {
      queryParam.admin = true;
    } else if (optionIsAdmin.value === 'No') {
      queryParam.admin = false;
    }

    if (keyword.value) {
      queryParam.keyword = keyword.value;
    }

    const rsp = await gUserApi.getUserList(queryParam);

    userList.value = rsp.data?.list || [];
    totalUsers.value = rsp.data?.total || 0;
  } finally {
    loading.value= false;
  }
}

async function handleEdit(index: number, row: UmsUserDTO) {
  console.log(`handleEdit: index ${index}, row ${row.username}`);
  editUser.value = row;
  userFormDialogVisible.value = true;
}

async function handleDelete(index: number, row: UmsUserDTO) {
  console.log(`handleDelete: index ${index}, row ${row.username}`);

  try {
    loading.value = true;

    await ElMessageBox.confirm(
      `Are you sure to delete user ${row.username}. Continue?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    );

    await gUserApi.delUser(row.id);

    await refreshUserList();
  }
  finally {
    loading.value = false;
  }
}

function onUserFormDialogOk() {
  userFormDialogVisible.value = false;
  refreshUserList();
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  height: 100%;

  .toolbar {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;

    .keyword-input {
      display: flex;
      align-items: center;
      width: 250px;
    }

    .select-yesno {
      display: flex;
      align-items: center;
      width: 200px;
    }
  }

  .red {
    color: red;
  }

  .pagination {
    margin-top: 10px;
    display: flex;
  }
}
</style>
