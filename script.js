$(function() {
  var leftIndex;

  function removeBreadcrumbs(index) {
    $('.breadcrumb').each(function(i) {
      var breadcrumb = $(this);
      if (i > index) breadcrumb.remove();
    });
  }

  function animoo(elem, opts) {
    elem.animate(opts, 200);
  }

  function animateToIndex(index) {
    leftIndex = index;
    var visualIndex = index - 1;
    $('.asset-columns').each(function(i) {
      var columns = $(this);
      var left, opacity, visible;
      if (i < visualIndex) {
        left = -50; opacity = 0;
      } else if (i > visualIndex + 1) {
        left = 100; opacity = 0;
      } else {
        left = 50 * (i - visualIndex); opacity = 1;
      }
      animoo(columns, { left: '' + left + '%', opacity: '' + opacity });
    });
  };

  function animateVertical(parentId) {
    var hIndex = leftIndex;
    $('.asset-columns#columns-' + hIndex + ' .asset-column').each(function() {
      var column = $(this);
      var i = column.data('index');
      var thisParentId = column.data('parent');
      var top, opacity, visible;
      if (thisParentId < parentId ) {
        top = -100; opacity = 0;
      } else if (thisParentId > parentId) {
        top = 100; opacity = 0;
      } else {
        top = 0; opacity = 1;
      }
      animoo(column, { top: '' + top + 'px', opacity: '' + opacity
      });
    });
  };

  function setVertical(parentId) {
    var hIndex = leftIndex + 1;
    $('.asset-columns#columns-' + hIndex + ' .asset-column').each(function() {
      var column = $(this);
      var i = column.data('index');
      var thisParentId = column.data('parent');
      var top, opacity, visible;
      if (thisParentId < parentId ) {
        top = -100; opacity = 0;
      } else if (thisParentId > parentId) {
        top = 100; opacity = 0;
      } else {
        top = 0; opacity = 1;
      }
      column.css({ top: '' + top + 'px', opacity: '' + opacity });
    });
  }

  animateToIndex(0);
  animateVertical(0, 0);

  function addBreadcrumb(name, index) {
    $('.breadcrumbs').append('<div class="breadcrumb"' +
      'data-name="' + name + '"' +
      'data-index="' + index +'">' +
      name + '</div>');
  }

  $('.breadcrumbs').on('click', '.breadcrumb', function(event) {
    var breadcrumb = $(this);
    var index = breadcrumb.data('index');

    animateToIndex(index + 1);
    removeBreadcrumbs(index + 1);
  });

  $('.asset-group').on('click', '.asset-item.has-children', function(event) {
    var assetItem = $(this);
    var assetColumn = assetItem.closest('.asset-column');
    var assetColumns = assetColumn.closest('.asset-columns');

    var index = assetColumns.data('index');
    var vIndex = assetItem.data('index');

    if (leftIndex === index + 1) {
      removeBreadcrumbs(index);
      addBreadcrumb(assetItem.data('name'), index);
      animateVertical(assetItem.data('id'))
    } else {
      addBreadcrumb(assetItem.data('name'), index);
      setVertical(assetItem.data('id'))
      animateToIndex(index + 1);
    }
  });
});
