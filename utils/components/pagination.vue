<template>
  <div class="PAGIANTION">
    <!-- 首部按钮 -->
    <span
      class="Pagination-button"
      :style="{ border: 'none' }"
      :class="{disable: headDisabled}"
      @click.stop="toHeadPage"
    >首页</span>
    <!-- prev -->
    <span class="Pagination-button prev" :class="{disable: headDisabled}" @click.stop="toPrevPage"></span>

    <!-- 首部省略号 -->
    <!-- <span v-if="headEllipsisShow" class="Pagination-info">...</span> -->

    <!-- 页码按钮 -->
    <span v-for="(i,  index) in showBunNum" :key="index">
      <span v-if="currentPage === i" class="Pagination-button active mt">{{ i }}</span>
      <span v-else class="Pagination-button mt" @click.stop="toPage(i)">{{ i }}</span>
    </span>

    <!-- 尾部省略号 -->
    <!-- <span v-if="tailEllipsisShow" class="Pagination-info">...</span> -->

    <!-- 尾部按钮 -->
    <!-- next -->
    <span class="Pagination-button next" :class="{disable: tailDisabled}" @click.stop="toNextPage"></span>
    <span
      class="Pagination-button"
      :style="{ border: 'none' }"
      :class="{disable: tailDisabled}"
      @click.stop="toTailPage"
    >尾页</span>
    <!-- <span class="Pagination-info">共 {{ totalPage }} 页</span> -->

    <!-- 跳转按钮 -->
    <span v-if="canJump">
      <span class="Pagination-input">
        <input type="text" v-model="canJumpNum" @keyup.enter="toPage(canJumpNum)" style="border: 1px solid #ccc" />
      </span>
      <span class="Pagination-info">/ {{ totalPage }} 页</span>

      <!-- <span class="Pagination-submit" @click.stop="toPage(canJumpNum)">确定</span> -->
    </span>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    currentPage: { type: [Number], required: true }, // 当前所在页数
    totalPage: { type: [Number], required: true }, // 一共有多少页
    howMuchPageButtons: { type: [Number], default: 9 }, // 会显示几个页码按钮
    baseOnCurrentPageButtonOffset: { type: [Number], default: 4 }, // 当前页码前后会展示几个页码按钮
    canJump: { type: Boolean, default: true } // 是否显示跳转框
  },
  data() {
    return {
      canJumpNum: null
    };
  },

  watch: {
    // 限制输入的值不能大于总页数的值, 且只能输入纯数字
    canJumpNum(newVal) {
      this.canJumpNum = (newVal + '').replace(/[^\d]/g, '')
      if (newVal > this.totalPage) {
        this.canJumpNum = this.totalPage
      }
    }
  },


  computed: {
    // 首尾按钮是否禁用
    headDisabled() {
      return !(this.currentPage > 1);
    },
    tailDisabled() {
      return !(this.currentPage < this.totalPage);
    },
    // 首尾省略号是否显示
    // headEllipsisShow() {
    //   if (this.totalPage > this.howMuchPageButtons)
    //     if (this.currentPage > this.baseOnCurrentPageButtonOffset + 1)
    //       return true;
    // },
    // tailEllipsisShow() {
    //   if (this.totalPage > this.howMuchPageButtons)
    //     if (
    //       this.totalPage >
    //       this.currentPage + this.baseOnCurrentPageButtonOffset
    //     )
    //       return true;
    // },
    // 结果： 最终显示的页码按钮数
    showBunNum() {
      return this.count_start_and_end_page(
        this.currentPage,
        this.totalPage,
        this.howMuchPageButtons,
        this.baseOnCurrentPageButtonOffset
      );
    }
  },
  methods: {
    toHeadPage() {
      if (this.headDisabled) return;
      let currentPage = 1;
      this.$emit('clickPageButton', currentPage);
    },
    toPrevPage() {
      if (this.headDisabled) return;
      let currentPage = this.currentPage;
      this.$emit('clickPageButton', --currentPage);
    },
    toNextPage() {
      if (this.tailDisabled) return;
      let currentPage = this.currentPage;
      this.$emit('clickPageButton', ++currentPage);
    },
    toTailPage() {
      if (this.tailDisabled) return;
      let currentPage = this.totalPage;
      this.$emit('clickPageButton', currentPage);
    },
    toPage(page) {
      console.log(page);
      if (!this.isRealNum(page)) return;
      if (page > this.totalPage) return;
      if (page < 1) return;
      let currentPage = parseInt(page);
      this.$emit('clickPageButton', currentPage);
    },

    // 计算显示的第一个和最后一个的页码按钮
    // 该函数会计算两次，第一次是没有得到currentPage和totalPage的，因此如不给默认值的话计算为 NaN

    count_start_and_end_page(
      currentPage = 1,
      totalPage = 1,
      howMuchPageButtons,
      baseOnCurrentPageButtonOffset
    ) {
      let startPage,
        endPage,
        result = [];
      // 当前页码大于偏移量，则起始按钮为 当前页码 - 偏移量
      if (currentPage > baseOnCurrentPageButtonOffset) {
        startPage = currentPage - baseOnCurrentPageButtonOffset;
        endPage =
          totalPage > currentPage + baseOnCurrentPageButtonOffset
            ? currentPage + baseOnCurrentPageButtonOffset
            : totalPage;
      }
      // 当前页码小于偏移量
      else {
        startPage = 1;
        endPage =
          totalPage > howMuchPageButtons ? howMuchPageButtons : totalPage;
      }
      if (currentPage + baseOnCurrentPageButtonOffset > totalPage) {
        startPage =
          startPage - (currentPage + baseOnCurrentPageButtonOffset - endPage);
      }

      if (startPage <= 0) startPage = 1;
      for (let i = startPage;i <= endPage;i++) {
        result.push(i);
      }
      return result; // 返回一个区间数组，供生成区间页码按钮
    },

    isRealNum(val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
      if (val === '' || val == null) {
        return false;
      }
      if (!isNaN(val)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.PAGIANTION {
  height: 78px;
  line-height: 78px;
  text-align: center;

  .Pagination-button,
  .Pagination-submit {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 8px;
    margin-right: 8px;
    text-align: center;
    line-height: 25px;

    color: #797c80;
    cursor: pointer;

    -moz-user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:not(.prev):not(.next) {
      border-radius: 25px;
    }
  }

  .Pagination-info {
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    text-align: center;
    line-height: 25px;

    color: #797c80;
  }

  .Pagination-input {
    display: inline-block;
    color: #797c80;

    input {
      vertical-align: middle;
      margin-bottom: 3px;
      box-sizing: border-box;
      padding-left: 15px;
      width: 44px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid rgba(192, 197, 204, 1);
    }
  }

  // status style
  .Pagination-button.active {
    background-color: #1985ff !important;
    color: #fff !important;
  }

  .Pagination-button.mt:hover {
    background: rgba(245, 246, 247, 1);
  }

  .Pagination-button.disable {
    color: #ccc;
    border: 1px solid transparent;
    cursor: not-allowed;
  }

  .Pagination-button.prev.disable {
    transform: translateY(3px);
    width: 0;
    height: 0;
    border: none;
    border-top: 8px solid transparent;
    border-right: 13px solid #aaaeb3;
    border-bottom: 8px solid transparent;
    margin-right: 15px;
  }

  .Pagination-button.next.disable {
    transform: translateY(3px);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-left: 13px solid #aaaeb3;
    border-bottom: 8px solid transparent;
    margin-left: 10px;
  }

  input[type='text']:focus {
    border-color: #1985ff !important;
    // box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    // -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    // outline: 0;
  }
}

// 上一页
.PAGIANTION .prev {
  transform: translateY(3px);
  width: 0;
  height: 0;
  border: none;
  border-top: 8px solid transparent;
  border-right: 13px solid #aaaeb3;
  border-bottom: 8px solid transparent;
  margin-right: 15px;
}

// 下一页
.PAGIANTION .next {
  transform: translateY(3px);
  width: 0;
  height: 0;
  border: none;
  border-top: 8px solid transparent;
  border-left: 13px solid #aaaeb3;
  border-bottom: 8px solid transparent;
}

.PAGIANTION .next,
.PAGIANTION .prev {
  margin: 0;
  padding: 0;
}

.mt {
  transform: translateY(1px);
}
</style>
