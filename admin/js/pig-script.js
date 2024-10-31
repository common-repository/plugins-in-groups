jQuery(document).ready(function() {

    /*
    * Remove the plugin group
    */
    jQuery('#pig_remove_group').on('click', function(v) {
        if (confirm("Do you really want to remove this group?")){
            var security = jQuery('#pig-remove-group-nonce').val();
            var current = jQuery('#pig_plugin_group').val();
            window.location.replace("?pig_remove_group_name=" + current + '&pig-remove-group-nonce=' + security);
        }
    });
    
    
    /*
    * Show group selector (it's visible at the moment)
    */
    jQuery('.pig-add-to-group').on('click', function(v) {
        v.preventDefault();
        jQuery(this).next('select').show();
    });
    
    
    /*
    * Assign plugin to the group
    */
    jQuery('.pig-select-group').on('change', function () {
        var current_select = jQuery(this);
        var plugin_file = current_select.attr('data-plugin-file');
        var security = jQuery('#pig-assign-to-group-nonce').val();
        var data = {
			'action': 'assign_to_group',
			'plugin-file': plugin_file,
            'selected-group': current_select.val(),
            'security': security
		};
        
        jQuery.post(ajaxurl, data, function(response) {
            var selected = response.data['selected-groups'];
            var all_groups = response.data['all-groups'];
            var list = '';
            var options = '<option disabled selected>Choose the group</option>';
            for (var i = 0, len = selected.length; i < len; i++) {
                list = list + '<span class="pig-reassign"><a class="ntdelbutton" data-pig-group="' + selected[i] + '" data-pig-plugin="' + plugin_file + '">X</a>&nbsp' + selected[i] + '</span>';
            }
            jQuery(".selected-groups-list[data-plugin-file='" + plugin_file + "']").html(list);
            for (var i = 0, len = all_groups.length; i < len; i++) {
                options = options + '<option value="' + all_groups[i] + '">' + all_groups[i] + '</option>';
            }
            current_select.html(options);
		});

    });
    
    
    /*
    * Reassign plugin from the group
    */
    jQuery('.selected-groups-list').on('click', 'a', function () {
        var plugin_file = jQuery(this).attr('data-pig-plugin');
        var group = jQuery(this).attr('data-pig-group');
        var current_select = jQuery('select[data-plugin-file="' + plugin_file + '"]');
        var security = jQuery('#pig-reassign-from-group-nonce').val();
        var data = {
			'action': 'reassign_from_group',
			'plugin-file': plugin_file,
            'selected-group': group,
            'security': security
		};
        
        jQuery.post(ajaxurl, data, function(response) {
            var selected = response.data['selected-groups'];
            var all_groups = response.data['all-groups'];
            var list = '';
            var options = '<option disabled selected>Choose the group</option>';
            for (var i = 0, len = selected.length; i < len; i++) {
                list = list + '<span class="pig-reassign"><a class="ntdelbutton" data-pig-group="' + selected[i] + '" data-pig-plugin="' + plugin_file + '">X</a>&nbsp' + selected[i] + '</span>';
            }
            jQuery(".selected-groups-list[data-plugin-file='" + plugin_file + "']").html(list);
            for (var i = 0, len = all_groups.length; i < len; i++) {
                options = options + '<option value="' + all_groups[i] + '">' + all_groups[i] + '</option>';
            }
            current_select.html(options);
		});

    });
    
    /*
    * Redirect to the filter results
    */
    jQuery('#pig_plugin_group').on('change', function () {
        var selected = jQuery(this).val();
        if ( selected == 'all' ) {
            jQuery(location).attr('href','plugins.php');
        } else {
            jQuery(location).attr('href','plugins.php?group=' + selected);
        }
    });
    
});
