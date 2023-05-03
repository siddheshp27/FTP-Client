package com.client.client;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


class Client extends FTPClient
{
    final private String host;
    final private int port;
    final private String userName;
    final private String password;


    Client(String host, int port, String userName, String password)
    {
        this.host = host;
        this.port = port;
        this.userName = userName;
        this.password = password;

    }


    boolean conn() throws IOException
    {
        connect(host, port);
        return true;
    }

    boolean disConn() throws IOException
    {
        disconnect();
        return true;
    }

    boolean logOut() throws IOException
    {
        return logout();
    }

    boolean userLogin() throws IOException
    {
        boolean a = login(userName, password);

        return a;
    }

//    ArrayList<String> ld() throws IOException
//    {
//        FTPFile[] files = listDirectories();
//        ArrayList<String> directoryFiles = new ArrayList<String>();
//
//
//        for (FTPFile file : files)
//        {
//            directoryFiles.add(file.getName());
//        }
//
//        return directoryFiles;
//    }

    Map<String, Object> ls() throws IOException
    {
        FTPFile[] Ffiles = listFiles();
        ArrayList<String> folders = new ArrayList<String>();
        ArrayList<String> files = new ArrayList<String>();
        Map<String, Object> res = new HashMap<>();
        for (FTPFile file : Ffiles)
        {
            if (file.isDirectory())
            {
                if (!file.getName().startsWith("."))
                    folders.add(file.getName());
            }
            else
                files.add(file.getName());
        }
        res.put("files", files);
        res.put("folders", folders);

        return res;
    }

    boolean cd(String nd) throws IOException
    {
        return changeWorkingDirectory(nd);
    }

    boolean mkdir(String folderName) throws IOException
    {
        return makeDirectory(folderName);
    }

    boolean uploadFile(String filePath) throws FileNotFoundException, IOException
    {
        InputStream stream = new FileInputStream(filePath);
        String name = filePath.substring(filePath.lastIndexOf('\\') + 1);
        setFileType(FTP.BINARY_FILE_TYPE);
        boolean status = storeFile(name, stream);
        stream.close();
        return status;
    }

    boolean download(String fileName) throws IOException
    {
        FileOutputStream stream = new FileOutputStream("./Files/" + fileName);
        setFileType(FTP.BINARY_FILE_TYPE);
        boolean status = retrieveFile(fileName, stream);
        stream.close();
        return status;

    }


    boolean rmdir(String fileName) throws IOException
    {
        return removeDirectory(fileName);
    }
    boolean rm(String fileName) throws IOException
    {
        return deleteFile(fileName);
    }

}

@SpringBootApplication
@RestController
@CrossOrigin
public class ClientAPI
{

    public static void main(String[] args)
    {
        SpringApplication.run(ClientAPI.class, args);
    }

//    String rm(String str)
//    {
//        while (str.indexOf('"') != -1)
//        {
//            str = str.substring(str.indexOf('"') + 1, str.lastIndexOf('"'));
//        }
//        return str;
//    }

    record request(String host, int port, String userName, String password, String currDir, String fileName,
                   String filePath, String folderName)
    {

    }


    @PostMapping("login")
    ResponseEntity<Map<String, Object>> login(@RequestBody request req)
    {

        Client client = new Client(req.host, req.port, req.userName, req.password);
        Map<String, Object> r = new HashMap<>();

        try
        {
            connection(client);
            client.cd(req.currDir);
            Map<String, Object> res = new HashMap<>(client.ls());
            client.disConn();
            return ResponseEntity.ok().body(res);
        } catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(r);

        }
    }

    void connection(Client client)
    {
        try
        {
            client.conn();
            client.userLogin();
        } catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    @PostMapping("download")
    ResponseEntity<Map<String, Object>> download(@RequestBody request req)
    {
        Client client = new Client(req.host, req.port, req.userName, req.password);
        Map<String, Object> res = new HashMap<>();
        connection(client);
        System.out.println(req.toString());
        try
        {
            client.cd(req.currDir);

            boolean fileStatus = client.download(req.fileName);
            res.put("downloadStatus", fileStatus);
            client.disConn();


        } catch (Exception e)
        {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(res);
    }

    @PostMapping("upload")
    ResponseEntity<Map<String, Object>> upload(@RequestBody request req)
    {
        Client client = new Client(req.host, req.port, req.userName, req.password);
        Map<String, Object> r = new HashMap<>();
        connection(client);
        System.out.println(req.toString());
        try
        {
            client.cd(req.currDir);

            boolean status = client.uploadFile(req.filePath);
            Map<String, Object> res = new HashMap<>(client.ls());
            res.put("uploadStatus", status);
            client.disConn();
            return ResponseEntity.ok().body(res);
        } catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.ok().body(r);

        }

    }

    @PostMapping("makedirectory")
    ResponseEntity<Map<String, Object>> makedir(@RequestBody request req)
    {

        Client client = new Client(req.host, req.port, req.userName, req.password);
        Map<String, Object> r = new HashMap<>();

        try
        {
            connection(client);
            client.cd(req.currDir);
            client.mkdir(req.folderName);
            Map<String, Object> res = new HashMap<>(client.ls());
            client.disConn();
            return ResponseEntity.ok().body(res);
        } catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(r);

        }
    }

@PostMapping("removedirectory")
    ResponseEntity<Map<String, Object>> remdir(@RequestBody request req)
    {

        Client client = new Client(req.host, req.port, req.userName, req.password);
        Map<String, Object> r = new HashMap<>();

        try
        {
            connection(client);
            client.cd(req.currDir);
            client.rmdir(req.folderName);
            Map<String, Object> res = new HashMap<>(client.ls());
            client.disConn();
            return ResponseEntity.ok().body(res);
        } catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(r);

        }
    }
@PostMapping("removefile")
    ResponseEntity<Map<String, Object>> remfile(@RequestBody request req)
    {

        Client client = new Client(req.host, req.port, req.userName, req.password);
        Map<String, Object> r = new HashMap<>();

        try
        {
            connection(client);
            client.cd(req.currDir);
            client.rm(req.folderName);
            Map<String, Object> res = new HashMap<>(client.ls());
            client.disConn();
            return ResponseEntity.ok().body(res);
        } catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(r);

        }
    }



}

