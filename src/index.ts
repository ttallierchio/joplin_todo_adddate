import joplin from 'api';
import { MenuItemLocation } from 'api/types';

joplin.plugins.register({

	onStart: async function () {

		
		await joplin.commands.register({
			name: 'CopyToDoCurrentDate',
			label: 'Copy ToDo With Current Date',
			execute: async () => {

				const note_ids = await joplin.workspace.selectedNoteIds();

				if (note_ids.length == 1) {
					const note_data = await joplin.data.get(['notes', note_ids[0]], { fields: ['body', 'parent_id', 'is_todo'] }).then(function (data) {

						var title: string = new Date().toLocaleDateString();
						joplin.data.post(['notes'], null, {
							body: data.body,
							title: title,
							parent_id: data.parent_id,
							is_todo: data.is_todo
						}
						)
					});


				}



			},
		});

		await joplin.views.menuItems.create('myContextMenuItem', 'CopyToDoCurrentDate', MenuItemLocation.EditorContextMenu);
	},

});