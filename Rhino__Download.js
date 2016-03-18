// A download manager application with a simple Java GUI

// Import the Swing GUI components and a few other classes
importPackage(javax.swing);
importClass(javax.swing.border.EmptyBorder);
importClass(java.awt.event.ActionListener);
importClass(java.net.URL);
importClass(java.io.FileOutputStream);
importClass(java.lang.Thread);

// Create some GUI widgets
var frame = new JFrame("Rhino URL Fetcher");    // Application window
var urlfield = new JTextField(30);  // URL Entry Field
var button = new JButton("Download");
var filechooser = new JFileChooser();
var row = Box.createHorizontalBox(); // A box for field and button
var col = Box.createVerticalBox();  // For row & progress bars
var padding = new EmptyBorder(3, 3, 3, 3);  // padding for rows

// Put them all together and display the GUI
row.add(urlfield);
row.add(button);
col.add(row);
frame.add(col);

row.setBorder(padding); // add some padding to the row 
frame.pack();           // set to minimum size
frame.visible = true; // make the window visible

// When anything happens to the window, call this function
frame.addWindowListener(function(e, name) {
    // If the user closes the window, exit the application
    if (name === "windowClosing")   // Rhino adds the name argument
        java.lang.System.exit(0);
});

// When the user clicks the button, call this function
button.addActionListener(function() {
    try {
        // Create a java.net.URL to represent the source
        // URL. (This will check that the user's input is 
        // well formed)
        var url = new URL(urlfield.text);
        // Ask the user to select a file to save the URL
        // contents to 
        var response = filechooser.showSaveDialog(frame);
        // Quit now if they clicked Cancel
        if (response != JFileChooser.APPROVE_OPTION) return;
        // Otherwise get the java.io.File that represents
        // the destination file
        var file = filechooser.getSelectedFile();
        // Now start a new thread to download the URL
        new java.lang.Thread(function() {
            download(url, file);
        }).start();
    }
    catch (e) {
        // Display a dialog box if anything goes wrong
        JOptionPane.showMessageDialog(frame, e.message, 
            "Exception", JOptionPane.ERROR_MESSAGE);
    }
});

// Use java.net.URL etc to download the content of the URL and
// use java.io.File to save that content to a file. Display 
// download progress in a JProgressBar component. This will be 
// invoked in a new thread.
function download(url, file) {
    try {
        // Each time we download a URL we add a new row 
        // to the window to display the URL, the filename,
        // and the download progress
        var row = Box.createHorizontalBox();
        row.setBorder(padding);
        var label = url.toString() + ": ";  // display URL 
        row.add(new JLabel(label));         // in a JLabel 
        var bar = new JProgressBar(0, 100);
        bar.stringPainted = true;
        bar.string = file.toString();
        row.add(bar);
        col.add(row);
        frame.pack();
        
        // We don't know the URL size so bar just keeps 
        // animating
        bar.indeterminate = true;
        
        // Now connect to the server and get the URL length
        // if we can
        var conn = url.openConnection();  //java.net.URLConnection
        conn.connect();     // connect and wait for headers
        var len = conn.contentLength;
        // see if we have the URL length
        if (len) {  // if length known
            bar.maximum = len;
            bar.indeterminate = false;
        }
        
        // Get input and output streams
        var input = conn.inputStream;
        var output = new FileOutputStream(file);
        
        // Create an array of 4k bytes as an input buffer
        var buffer = java.lang.reflect.Array.newInstance(
            java.lang.Byte.TYPE, 4096);
        var num;
        while ((num = input.read(buffer)) != -1) {
            output.write(buffer, 0, num);   // write bytes to file 
            bar.value += num;
        }
        output.close();
        input.close();
    }
    catch (e) {
        // If anything goes wrong display error in progress
        // bar 
        if (bar) {
            bar.indeterminate = false;  // stop animating
            bar.string = e.toString(); // replace filename w error 
            
        }
    }
}