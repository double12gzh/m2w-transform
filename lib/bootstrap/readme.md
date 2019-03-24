# form-focus-panel 样式

html:
```
<div class="form-focus-panel">
	<input type="text" required="" name="org" readonly="readonly" placeholder="点击此处选择部门" class="form-control input-sm">
	<span class="fa fa-calendar form-control-feedback text-muted"></span>
	<div class="form-focus-body ztree" id="userAdd_orgTree">
	  
	</div>
</div>
```

主要起作用的是两个样式： form-focus-panel 和 form-focus-body

input里面的值需要自己按照自己的需求用回调写进去，比如如果是树插件，就在setting里面用onClick回调函数在表单中填入数据。