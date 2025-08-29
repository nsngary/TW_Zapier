<template>
  <header class="editor-header" data-testid="editor-header">
    <div class="header-container">
      <a href="#main" class="skip-link" data-testid="skip-link">Skip to content</a>

      <!-- Logo -->
      <div class="logo-section">
        <a class="logo-link" aria-label="TW_Zapier" href="/" @click="handleLogoClick">
          <svg class="logo-svg" width="104" height="28" viewBox="0 0 244 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- z -->
            <path d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z" fill="#86735E"></path>
            <!-- a -->
            <path d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 93.071 40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z" fill="#86735E"></path>
            <!-- p -->
            <path d="M146.201 14.6695C142.357 14.6695 139.268 15.8764 136.935 18.2902C135.207 20.0786 133.939 22.7479 133.131 26.2981H132.771L131.295 15.7563H121.657V66H132.942V45.3054H133.354C133.698 46.6852 134.181 48.0267 134.795 49.3093C135.75 51.3986 137.316 53.1496 139.286 54.3314C141.328 55.446 143.629 56.0005 145.955 55.9387C150.68 55.9387 154.277 54.0988 156.748 50.419C159.219 46.7392 160.455 41.6046 160.455 35.0153C160.455 28.6509 159.259 23.6689 156.869 20.0691C154.478 16.4694 150.922 14.6695 146.201 14.6695ZM147.345 42.9602C146.029 44.8668 143.97 45.8201 141.167 45.8201C140.012 45.8735 138.86 45.6507 137.808 45.1703C136.755 44.6898 135.832 43.9656 135.116 43.0574C133.655 41.2233 132.927 38.7122 132.931 35.5243V34.7807C132.931 31.5432 133.659 29.0646 135.116 27.3448C136.572 25.625 138.59 24.7747 141.167 24.7937C144.02 24.7937 146.092 25.6994 147.385 27.5107C148.678 29.322 149.324 31.8483 149.324 35.0896C149.332 38.4414 148.676 41.065 147.356 42.9602H147.345Z" fill="#86735E"></path>
            <!-- i 身-->
            <path d="M175.035 15.7391H163.75V54.7833H175.035V15.7391Z" fill="#86735E"></path>
            <!-- i 頭 -->
            <path d="M169.515 0.00366253C168.666 -0.0252113 167.82 0.116874 167.027 0.421484C166.234 0.726094 165.511 1.187 164.899 1.77682C164.297 2.3723 163.824 3.08658 163.512 3.87431C163.2 4.66204 163.055 5.50601 163.086 6.35275C163.056 7.20497 163.201 8.05433 163.514 8.84781C163.826 9.64129 164.299 10.3619 164.902 10.9646C165.505 11.5673 166.226 12.0392 167.02 12.3509C167.814 12.6626 168.663 12.8074 169.515 12.7762C170.362 12.8082 171.206 12.6635 171.994 12.3514C172.782 12.0392 173.496 11.5664 174.091 10.963C174.682 10.3534 175.142 9.63077 175.446 8.83849C175.75 8.04621 175.89 7.20067 175.859 6.35275C175.898 5.50985 175.761 4.66806 175.456 3.88115C175.151 3.09424 174.686 2.37951 174.09 1.78258C173.493 1.18565 172.779 0.719644 171.992 0.414327C171.206 0.109011 170.364 -0.0288946 169.521 0.00938803L169.515 0.00366253Z" fill="#86735E"></path>
            <!-- e -->
            <path d="M208.473 17.0147C205.839 15.4474 202.515 14.6657 198.504 14.6695C192.189 14.6695 187.247 16.4675 183.678 20.0634C180.108 23.6593 178.324 28.6166 178.324 34.9352C178.233 38.7553 179.067 42.5407 180.755 45.9689C182.3 49.0238 184.706 51.5592 187.676 53.2618C190.665 54.9892 194.221 55.8548 198.344 55.8586C201.909 55.8586 204.887 55.3095 207.278 54.2113C209.526 53.225 211.483 51.6791 212.964 49.7211C214.373 47.7991 215.42 45.6359 216.052 43.3377L206.329 40.615C205.919 42.1094 205.131 43.4728 204.041 44.5732C202.942 45.6714 201.102 46.2206 198.521 46.2206C195.451 46.2206 193.163 45.3416 191.657 43.5837C190.564 42.3139 189.878 40.5006 189.575 38.1498H216.201C216.31 37.0515 216.367 36.1306 216.367 35.387V32.9561C216.431 29.6903 215.757 26.4522 214.394 23.4839C213.118 20.7799 211.054 18.5248 208.473 17.0147ZM198.178 23.9758C202.754 23.9758 205.348 26.2275 205.962 30.731H189.775C190.032 29.2284 190.655 27.8121 191.588 26.607C193.072 24.8491 195.268 23.972 198.178 23.9758Z" fill="#86735E"></path>
            <!-- r -->
            <path d="M241.666 15.7391C238.478 15.7391 235.965 16.864 234.127 19.1139C232.808 20.7307 231.805 23.1197 231.119 26.2809H230.787L229.311 15.7391H219.673V54.7775H230.959V34.7578C230.959 32.2335 231.55 30.2982 232.732 28.9521C233.914 27.606 236.095 26.933 239.275 26.933H243.559V15.7391H241.666Z" fill="#86735E"></path>
            <!-- _ -->
            <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#A86F4B"></path>
          </svg>
        </a>

        <!-- 工作流名稱顯示 -->
        <div class="workflow-info" v-if="workflowName">
          <span class="workflow-name">{{ workflowName }}</span>
          <span class="workflow-status" :class="statusClass">{{ statusText }}</span>
        </div>
      </div>
      
      <!-- 導航選單 -->
      <div class="nav-desktop">
        <nav aria-label="Editor navigation">
          <ul class="nav-list">
            <li>
              <details class="nav-dropdown" data-testid="nav-dropdown">
                <summary class="dropdown-summary" data-testid="nav-dropdown-summary">
                  <span>檔案</span>
                  <span class="dropdown-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.2999L19 11.4399V8.81995L12 14.6999L5 8.81995V11.4399L12 17.2999Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </summary>
                <!-- 下拉選單內容 -->
                <div class="dropdown-menu">
                  <a href="#" class="dropdown-item" @click="handleNewWorkflow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V22M2 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span class="item-content">
                      <span class="item-title">新建工作流</span>
                      <span class="item-shortcut">Ctrl+N</span>
                    </span>
                  </a>
                  <a href="#" class="dropdown-item" @click="handleOpenWorkflow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="item-content">
                      <span class="item-title">開啟工作流</span>
                      <span class="item-shortcut">Ctrl+O</span>
                    </span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item" @click="handleSaveWorkflow" :class="{ disabled: !hasUnsavedChanges }">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 21V13H7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 3V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="item-content">
                      <span class="item-title">儲存工作流</span>
                      <span class="item-shortcut">Ctrl+S</span>
                    </span>
                  </a>
                  <a href="#" class="dropdown-item" @click="handleSaveAsWorkflow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 21V13H7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 3V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="item-content">
                      <span class="item-title">另存新檔</span>
                      <span class="item-shortcut">Ctrl+Shift+S</span>
                    </span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item" @click="handleImportWorkflow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 10L12 5L7 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 5V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="item-content">
                      <span class="item-title">匯入工作流</span>
                      <span class="item-shortcut">Ctrl+I</span>
                    </span>
                  </a>
                  <a href="#" class="dropdown-item" @click="handleExportWorkflow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="item-content">
                      <span class="item-title">匯出工作流</span>
                      <span class="item-shortcut">Ctrl+E</span>
                    </span>
                  </a>
                </div>
              </details>
            </li>
            <li>
              <details class="nav-dropdown" data-testid="nav-dropdown">
                <summary class="dropdown-summary" data-testid="nav-dropdown-summary">
                  <span>編輯</span>
                  <span class="dropdown-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.2999L19 11.4399V8.81995L12 14.6999L5 8.81995V11.4399L12 17.2999Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </summary>
                <div class="dropdown-menu absolute top-full left-0 mt-2 z-50">
                  <a href="#" class="dropdown-item" @click="handleUndo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 7V3H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 3L9 9C10.5913 10.5913 12.6957 11.4956 14.8984 11.4956C17.1011 11.4956 19.2055 10.5913 20.7968 9L21 8.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    復原 (Ctrl+Z)
                  </a>
                  <a href="#" class="dropdown-item" @click="handleRedo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7V3H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21 3L15 9C13.4087 10.5913 11.3043 11.4956 9.10156 11.4956C6.89888 11.4956 4.79449 10.5913 3.20312 9L3 8.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    重做 (Ctrl+Y)
                  </a>
                  <hr class="my-2 border-neutral-200">
                  <a href="#" class="dropdown-item" @click="handleSelectAll">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    全選 (Ctrl+A)
                  </a>
                  <a href="#" class="dropdown-item" @click="handleClearCanvas">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    清空畫布
                  </a>
                </div>
              </details>
            </li>
            <li>
              <details class="nav-dropdown" data-testid="nav-dropdown">
                <summary class="dropdown-summary" data-testid="nav-dropdown-summary">
                  <span>檢視</span>
                  <span class="dropdown-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.2999L19 11.4399V8.81995L12 14.6999L5 8.81995V11.4399L12 17.2999Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </summary>
                <div class="dropdown-menu absolute top-full left-0 mt-2 z-50">
                  <a href="#" class="dropdown-item" @click="handleFitView">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    適應視圖
                  </a>
                  <a href="#" class="dropdown-item" @click="handleZoomIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                      <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11 8V14M8 11H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    放大
                  </a>
                  <a href="#" class="dropdown-item" @click="handleZoomOut">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                      <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8 11H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    縮小
                  </a>
                </div>
              </details>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 中央快捷工具列 -->
    <div class="center-toolbar">
      <div class="toolbar-group">
        <button
          @click="handleUndo"
          class="toolbar-btn"
          :disabled="!canUndo"
          title="復原 (Ctrl+Z)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7V3H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 3L9 9C10.5913 10.5913 12.6957 11.4956 14.8984 11.4956C17.1011 11.4956 19.2055 10.5913 20.7968 9L21 8.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          @click="handleRedo"
          class="toolbar-btn"
          :disabled="!canRedo"
          title="重做 (Ctrl+Y)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7V3H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 3L15 9C13.4087 10.5913 11.3043 11.4956 9.10156 11.4956C6.89888 11.4956 4.79449 10.5913 3.20312 9L3 8.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button
          @click="handleFitView"
          class="toolbar-btn"
          title="適應視圖"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          @click="handleZoomIn"
          class="toolbar-btn"
          title="放大"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 8V14M8 11H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button
          @click="handleZoomOut"
          class="toolbar-btn"
          title="縮小"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 11H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button
          @click="handleValidateWorkflow"
          class="toolbar-btn"
          :class="{ 'btn-warning': hasValidationErrors, 'btn-success': isValidated && !hasValidationErrors }"
          title="驗證工作流"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 右側操作按鈕 -->
    <div class="header-actions">
      <div class="status-indicators">
        <!-- 儲存狀態指示器 -->
        <div class="status-indicator" v-if="saveStatus" :class="saveStatusClass">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
          </svg>
          <span class="status-text">{{ saveStatusText }}</span>
        </div>

        <!-- 連線狀態指示器 -->
        <div class="status-indicator" v-if="connectionStatus" :class="connectionStatusClass">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 14.5L15.5 7.5M15 8H16C17.1046 8 18 8.89543 18 10V14C18 15.1046 17.1046 16 16 16H8C6.89543 16 6 15.1046 6 14V10C6 8.89543 6.89543 8 8 8H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="status-text">{{ connectionStatusText }}</span>
        </div>
      </div>

      <div class="action-buttons">
        <button
          @click="handleRunWorkflow"
          class="btn btn-run"
          :disabled="!canRunWorkflow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
          </svg>
          <span class="btn-text">執行</span>
        </button>
        <button
          @click="handleSaveWorkflow"
          class="btn btn-save"
          :disabled="!hasUnsavedChanges"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 21V13H7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 3V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="btn-text">儲存</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

// 定義 props
interface Props {
  workflowName?: string
  hasUnsavedChanges?: boolean
  canUndo?: boolean
  canRedo?: boolean
  canRunWorkflow?: boolean
  saveStatus?: 'saving' | 'saved' | 'error' | null
  connectionStatus?: 'connected' | 'disconnected' | 'connecting' | null
  hasValidationErrors?: boolean
  isValidated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  workflowName: '',
  hasUnsavedChanges: false,
  canUndo: false,
  canRedo: false,
  canRunWorkflow: true,
  saveStatus: null,
  connectionStatus: null,
  hasValidationErrors: false,
  isValidated: false
})

// 定義 emits
const emit = defineEmits([
  'new-workflow',
  'open-workflow',
  'save-workflow',
  'save-as-workflow',
  'import-workflow',
  'export-workflow',
  'undo',
  'redo',
  'select-all',
  'clear-canvas',
  'fit-view',
  'zoom-in',
  'zoom-out',
  'run-workflow',
  'validate-workflow'
])

// Router 實例
const router = useRouter()

// 處理 logo 點擊事件
const handleLogoClick = async (event: Event) => {
  // 如果有未儲存的變更，顯示確認對話框
  if (props.hasUnsavedChanges) {
    event.preventDefault()

    try {
      await ElMessageBox.confirm(
        '您有未儲存的變更，要儲存變更後離開，還是直接離開？',
        '離開確認',
        {
          confirmButtonText: '儲存並離開',
          cancelButtonText: '直接離開',
          distinguishCancelAndClose: true,
          type: 'warning'
        }
      )

      // 用戶選擇儲存並離開
      try {
        emit('save-workflow')
        // 等待一下讓儲存完成，然後導向儀表板
        setTimeout(() => {
          router.push('/')
        }, 500)
      } catch (error) {
        ElMessage.error('儲存失敗，無法離開')
      }
    } catch (action) {
      if (action === 'cancel') {
        // 用戶選擇直接離開
        router.push('/')
      }
      // 如果是 'close'，什麼都不做，留在當前頁面
    }
  }
  // 如果沒有未儲存的變更，直接導向
}

// 計算屬性
const statusClass = computed(() => {
  if (props.hasUnsavedChanges) return 'status-unsaved'
  if (props.saveStatus === 'saving') return 'status-saving'
  if (props.saveStatus === 'saved') return 'status-saved'
  if (props.saveStatus === 'error') return 'status-error'
  return ''
})

const statusText = computed(() => {
  if (props.hasUnsavedChanges) return '未儲存'
  if (props.saveStatus === 'saving') return '儲存中...'
  if (props.saveStatus === 'saved') return '已儲存'
  if (props.saveStatus === 'error') return '儲存失敗'
  return ''
})

const saveStatusClass = computed(() => {
  switch (props.saveStatus) {
    case 'saving': return 'status-saving'
    case 'saved': return 'status-saved'
    case 'error': return 'status-error'
    default: return ''
  }
})

const saveStatusText = computed(() => {
  switch (props.saveStatus) {
    case 'saving': return '儲存中'
    case 'saved': return '已儲存'
    case 'error': return '儲存失敗'
    default: return ''
  }
})

const connectionStatusClass = computed(() => {
  switch (props.connectionStatus) {
    case 'connected': return 'status-connected'
    case 'disconnected': return 'status-disconnected'
    case 'connecting': return 'status-connecting'
    default: return ''
  }
})

const connectionStatusText = computed(() => {
  switch (props.connectionStatus) {
    case 'connected': return '已連線'
    case 'disconnected': return '未連線'
    case 'connecting': return '連線中'
    default: return ''
  }
})

// 事件處理函數
const handleNewWorkflow = () => emit('new-workflow')
const handleOpenWorkflow = () => emit('open-workflow')
const handleSaveWorkflow = () => emit('save-workflow')
const handleSaveAsWorkflow = () => emit('save-as-workflow')
const handleImportWorkflow = () => emit('import-workflow')
const handleExportWorkflow = () => emit('export-workflow')
const handleUndo = () => emit('undo')
const handleRedo = () => emit('redo')
const handleSelectAll = () => emit('select-all')
const handleClearCanvas = () => emit('clear-canvas')
const handleFitView = () => emit('fit-view')
const handleZoomIn = () => emit('zoom-in')
const handleZoomOut = () => emit('zoom-out')
const handleRunWorkflow = () => emit('run-workflow')
const handleValidateWorkflow = () => emit('validate-workflow')
</script>

<style scoped>
/* Header 根容器 - 基於 website 樣式 */
.editor-header {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fbfaf8; /* website header 背景色 */
  border-bottom: 1px solid #ece9df; /* website header 邊框色 */
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (min-width: 1071px) {
  .editor-header {
    padding: 0 24px;
  }
}

.header-container {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

/* Logo 區域 */
.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.workflow-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.workflow-name {
  font-size: 14px;
  font-weight: 600;
  color: #413735;
  line-height: 1.2;
}

.workflow-status {
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.workflow-status.status-unsaved {
  color: #C2474A;
  background-color: rgba(194, 71, 74, 0.1);
}

.workflow-status.status-saving {
  color: #86735E;
  background-color: rgba(134, 115, 94, 0.1);
}

.workflow-status.status-saved {
  color: #667539;
  background-color: rgba(102, 117, 57, 0.1);
}

.workflow-status.status-error {
  color: #C2474A;
  background-color: rgba(194, 71, 74, 0.1);
}

/* Skip Link */
.skip-link {
  width: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-inline: auto;
  padding: 2px 16px 8px;
  font: 400 .875rem/1.5rem Inter, Helvetica, arial, sans-serif;
  color: #fffdf9;
  background-color: #503ebd;
  border-radius: 0 0 4px 4px;
  text-decoration: none;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
}

.skip-link:focus {
  opacity: 1;
  pointer-events: all;
}

/* Logo */
.logo-link:focus-visible {
  outline: .125rem solid #695be8;
  outline-offset: 8px;
}

.logo-svg {
  display: block;
}

/* 導航選單 */
.nav-desktop {
  display: none;
}

@media (min-width: 1071px) {
  .nav-desktop {
    display: unset;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 下拉選單 */
.nav-dropdown {
  position: relative;
}

.dropdown-summary {
  display: flex;
  position: relative;
  align-items: center;
  padding: 10px 8px 10px 10px;
  font-family: Inter, Helvetica, arial, sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: #413735;
  border-radius: 4px;
  list-style: none;
  cursor: pointer;
  outline: none;
}

.dropdown-summary:hover,
.dropdown-summary:focus-visible {
  background-color: #f5f3eb;
}

.dropdown-summary:focus-visible {
  outline: .125rem solid #695be8;
  outline-offset: 2px;
}

.dropdown-summary::-webkit-details-marker {
  display: none;
}

.dropdown-summary:after {
  content: "";
  height: 4px;
  background-color: #86735E;
  width: 0;
  position: absolute;
  left: 0;
  bottom: -9.5px;
  transition: width .25s ease-in-out;
}

.nav-dropdown[open] .dropdown-summary:after {
  width: 100%;
}

.dropdown-indicator {
  display: flex;
  margin-left: 4px;
  transition: transform .25s ease-in-out;
}

.nav-dropdown[open] .dropdown-indicator {
  transform: rotate(-180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  z-index: 50;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  min-width: 192px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  font-size: 14px;
  color: #374151;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

.dropdown-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.item-title {
  font-size: 14px;
  color: #374151;
}

.item-shortcut {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 500;
}

/* 中央工具列 */
.center-toolbar {
  display: none;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .center-toolbar {
    display: flex;
  }
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background-color: #e5e7eb;
  margin: 0 4px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.toolbar-btn:hover:not(:disabled) {
  background-color: #f3f4f6;
  color: #374151;
}

.toolbar-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.toolbar-btn.btn-warning {
  color: #f59e0b;
  background-color: rgba(245, 158, 11, 0.1);
}

.toolbar-btn.btn-success {
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.1);
}

/* 右側操作按鈕 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-indicator.status-saving {
  color: #86735E;
  background-color: rgba(134, 115, 94, 0.1);
}

.status-indicator.status-saved {
  color: #667539;
  background-color: rgba(102, 117, 57, 0.1);
}

.status-indicator.status-error {
  color: #C2474A;
  background-color: rgba(194, 71, 74, 0.1);
}

.status-indicator.status-connected {
  color: #667539;
  background-color: rgba(102, 117, 57, 0.1);
}

.status-indicator.status-disconnected {
  color: #C2474A;
  background-color: rgba(194, 71, 74, 0.1);
}

.status-indicator.status-connecting {
  color: #86735E;
  background-color: rgba(134, 115, 94, 0.1);
}

.status-text {
  font-size: 10px;
}

.status-indicator svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:not(:disabled):active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-run {
  background-color: #667539; /* $success-color */
  color: white;
}

.btn-run:not(:disabled):hover {
  background-color: #5a6632;
}

.btn-save {
  background-color: #86735E; /* $primary-500 */
  color: white;
}

.btn-save:not(:disabled):hover {
  background-color: #7a6654;
}

.btn-text {
  font-size: 14px;
  font-weight: 500;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .header-container {
    gap: 8px;
  }

  .workflow-info {
    display: none;
  }

  .center-toolbar {
    display: none;
  }

  .status-indicators {
    display: none;
  }

  .btn-text {
    display: none;
  }

  .btn {
    padding: 8px;
    min-width: 40px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .nav-desktop {
    display: none;
  }

  .header-actions {
    gap: 4px;
  }

  .action-buttons {
    gap: 4px;
  }
}
</style>
