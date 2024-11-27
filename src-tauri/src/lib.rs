use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn ctx_start(window: tauri::Window) {
    window.show().expect("Failed to hide window");
	// window.set_ignore_cursor_events(false).expect("Failed to ignore cursor events");
}

#[tauri::command]
fn ctx_finish(window: tauri::Window) {
	window.set_ignore_cursor_events(true).expect("Failed to allow cursor events");
}

#[tauri::command]
fn window_show(window: tauri::Window) {
    window.show().expect("Failed to show window");
	window.set_ignore_cursor_events(false).expect("Failed to ignore cursor events");
}

#[tauri::command]
fn window_hide(window: tauri::Window) {
    window.hide().expect("Failed to hide window");
}


// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_shell::init())
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![ctx_start, ctx_finish, window_show, window_hide])
        .setup(|app| {
            let window = app.get_webview_window("main").expect("Window failed");
            window
                .set_ignore_cursor_events(true)
                .expect("Failed to set ignore cursor events");
            #[cfg(not(target_os = "linux"))]
            window.maximize().expect("Could not maximize window");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
