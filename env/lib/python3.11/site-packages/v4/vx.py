#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  fileread.py
#  
#  Copyright 2022 Anthony Reeves <reeves@cornell.edu>
#  20220510 Version 0.91
#  

from __future__ import print_function, division
import os
import subprocess
import re
import numpy as np
import sys
import string
from datetime import date
import struct
from PIL import Image

#### Image pixel types 
# uint8 VX_PCHAR   
# int16 VX_PINT
# int32 VX_PLONG
# float32 VX_FLOAT
# float64 VX_DOUBLE
def vxparse (argv, opt):
    av=' '.join(argv)
    cmd= "vshparse " + opt + " with " + av
    out=subprocess.check_output( cmd, shell=True).decode()
    #p = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    #out, _ = p.communicate()
    #### python does not like a variable name "if" change to "vxif"
    olist = re.sub("if=", "vxif=", out )
    return olist

from copy import deepcopy
def vaparse(argst,**kwargs):
    '''parse command line arguments using v4 rules
    returns a dict with matched arguments
    any unmatched args are returned in a list celled umatch
    '''
    rdict = {}
    slist = {}
    mlist = []
    alist = []
    umatch = []
    if 'args' in kwargs:
        xilist = kwargs['args']
    else:
        xilist = sys.argv
    ilist=deepcopy(xilist)
    qlist = argst.split()
    if 'pname' not in kwargs:
        del ilist[0]
    for i in qlist:
        if i[0] == '-':
            mlist.append(i)
        else:
            alist.append(i)
    for i in ilist:
        if 0 == i.find('-'):
          if i in mlist:
            rdict[i] = i
            mlist.remove(i)
          else:
            umatch.append(i)
        else:
            index = i.find('=')
            if index != -1:
                key = i[:index+1]
                if key in alist:
                    rdict[key[:len(key)-1]] = i[index+1:]
                    alist.remove(key)
                else:
                    umatch.append(i)
            else:
                if len(alist) != 0:
                    key = alist[0]
                    rdict[key[:len(key)-1]] = i
                    alist.remove(key)
                else:
                    umatch.append(i)
    if len(umatch) != 0:
        rdict['umatch'] = umatch
    return rdict


              
eldcodes =  {'VX_FRAME':0x1a, 'VX_EFRAME':0x2a, 'VX_COMP':0x08, 'VX_XCOMP':0x0b, 'VX_V2D':0x33, 'VX_V3D':0x43, 'VX_INVY':0x39, 'VX_ZISF':0x49, 'VX_VID':0xda, 'VX_ADJ':0xd7, 'VX_BBX':0x53, 'VX_TRANMX':0x83, 'VX_REND':0x6a, 'VX_COLOR':0x63, 'VX_CMAP':0x61, 'VX_ID':0x5a, 'VX_IDV':0x57, 'VX_CIDX':0x67, 'VX_GFH':0xd0, 'VX_GFV':0x73, 'VX_DIST':0xd3, 'VX_FHIST':0x20, 'VX_FNAME':0x30, 'VX_FMACH':0x50, 'VX_FCMND':0x40, 'VX_FTIME':0x4a, 'VX_FUID':0x3a, 'VX_PBYTE':0xa1, 'VX_PSHORT':0xa2, 'VX_PFLOAT':0xa3, 'VX_PDOUBLE':0xa4, 'VX_PCHAR':0xa5, 'VX_PBIT':0xa6, 'VX_PINT':0xa7, 'VX_PIDX':0xb1, 'VX_PCHAN':0xaa, 'VX_GTEXT':0xc0, 'VX_GBYTE':0xc1, 'VX_GSHORT':0xc2, 'VX_GFLOAT':0xc3, 'VX_GDOUBLE':0xc4, 'VX_GCHAR':0xc5, 'VX_GBIT':0xc6, 'VX_GINT':0xc7, 'VX_GSINT':0xca, 'VX_TTABLE':0x70, 'VX_CTABLE':0x80, 'VX_ANHDR':0xd1, 'VX_DICOM':0xe1, 'VX_ANNOTE':0x60, 'VX_NULLT':0x00}
elcodes =  {'0x1a': 'VX_FRAME', '0x2a': 'VX_EFRAME', '0x08': 'VX_COMP', '0x0b': 'VX_XCOMP', '0x33': 'VX_V2D', '0x43': 'VX_V3D', '0x39': 'VX_INVY', '0x49': 'VX_ZISF', '0xda': 'VX_VID', '0xd7': 'VX_ADJ', '0x53': 'VX_BBX', '0x83': 'VX_TRANMX', '0x6a': 'VX_REND', '0x63': 'VX_COLOR', '0x61': 'VX_CMAP', '0x5a': 'VX_ID', '0x57': 'VX_IDV', '0x67': 'VX_CIDX', '0xd0': 'VX_GFH', '0x73': 'VX_GFV', '0xd3': 'VX_DIST', '0x20': 'VX_FHIST', '0x30': 'VX_FNAME', '0x50': 'VX_FMACH', '0x40': 'VX_FCMND', '0x4a': 'VX_FTIME', '0x3a': 'VX_FUID', '0xa1': 'VX_PBYTE', '0xa2': 'VX_PSHORT', '0xa3': 'VX_PFLOAT', '0xa4': 'VX_PDOUBLE', '0xa5': 'VX_PCHAR', '0xa6': 'VX_PBIT', '0xa7': 'VX_PINT', '0xb1': 'VX_PIDX', '0xaa': 'VX_PCHAN', '0xc0': 'VX_GTEXT', '0xc1': 'VX_GBYTE', '0xc2': 'VX_GSHORT', '0xc3': 'VX_GFLOAT', '0xc4': 'VX_GDOUBLE', '0xc5': 'VX_GCHAR', '0xc6': 'VX_GBIT', '0xc7': 'VX_GINT', '0xca': 'VX_GSINT', '0x70': 'VX_TTABLE', '0x80': 'VX_CTABLE', '0xd1': 'VX_ANHDR', '0xe1': 'VX_DICOM', '0x60': 'VX_ANNOTE', '0x00': 'VX_NULLT'}
elnames = {'0x1a': 'Image Frame', '0x2a': 'End Frame', '0x08': 'Compact List', '0x0b': 'Ext. Comp. List', '0x33': '2-D vector', '0x43': '3-D vector', '0x39': 'Inverted Y', '0x49': 'Z is Frame', '0xda': 'Vertex ID', '0xd7': 'Adjacency Index', '0x53': 'Bounding Box', '0x83': 'Coord Trans', '0x6a': 'Render option', '0x63': 'Color Triple', '0x61': 'Color Map', '0x5a': 'Object ID.', '0x57': 'ID Vector', '0x67': 'Color Index', '0xd0': 'Feature Hdr.', '0x73': 'Feature Vec.', '0xd3': 'Distance Vec.', '0x20': 'File History', '0x30': 'File Name', '0x50': 'File Machine', '0x40': 'File Command', '0x4a': 'File Date', '0x3a': 'File User ID', '0xa1': 'Pixels (byte)', '0xa2': 'Pixels (short)', '0xa3': 'Pixels (float)', '0xa4': 'Pixels (Double)', '0xa5': 'Pixels (S-byte)', '0xa6': 'Pixels (Bit)', '0xa7': 'Pixels (Int)', '0xb1': 'Pixels (Index)', '0xaa': 'Pixel Channels', '0xc0': 'Generic(text)', '0xc1': 'Generic(byte)', '0xc2': 'Generic(short)', '0xc3': 'Generic(float)', '0xc4': 'Generic(Double)', '0xc5': 'Generic(S-byte)', '0xc6': 'Generic(Bit)', '0xc7': 'Generic(Int)', '0xca': 'Generic(Scalar)', '0x70': 'Text Table(tab)', '0x80': 'Text Table()', '0xd1': 'ANALYZE 7.5 hdr', '0xe1': 'DICOM P10 hdr', '0x60': 'Annotation', '0x00': 'Not Defined'}
def main(args):
    return 0

#VX element data lengths
vxdlens  = ( 1, 1, 2, 4, 8, 1, 1, 4, 0, 0)
#VX element data types
vxdtypes = ("c", "B", "h", "f", "d", "b", "B", "l", "x", "x")
#VX element data types
vnptypes = (np.byte, np.ubyte, np.short, np.single, np.double, np.byte, np.ubyte, np.intc, "x", "x")

if __name__ == '__main__':
     import sys
    #sys.exit(main(sys.argv))

#vxfreadelem
#reads an element from a file 
# returns key and data 

def vxfreadelem ( f ):
        """ read a vx element from an opened file"""
        global elcodes, vxdtypes, vxdlens
        elemr = f.read (4 )
        if ( len(elemr) != 4 ):
            return (("EOF", 0, ""))
        elem = struct.unpack('i', elemr) [0] 
        ## read length
        eleml = f.read (4 )
        if ( len(eleml) != 4 ):
            return (("EOF", 0, ""))
        elen = struct.unpack('i', eleml) [0] 
        #print (hex(elem))
        #print (hex(elem))
        key = hex(elem)
        base= elem & 0xf
        #print (elem)
        if key in elcodes:
            elname = elcodes[key] 
            #print ("%s: %s (%s)" % (key, elname, elen ))
        else:
            return (("EOF", 0, ""))
        if  base == 10 :
             return ((elname, elen, ""))
        else:
            #print (elem, key,  base, elen, vxdtypes[base], vxdlens[base], elen//vxdlens[base])
            edata = f.read (elen )
            if ( len(edata) != elen ):
                 return (("EOF", 0, ""))
        #print ( "base is %i " % base)
        if base == 0:
                 data = edata.decode('UTF-8')
                 return ((elname, data, ""))
        else:
                 #print (" edata length %i" % len(edata))
                 # the "<" was added to enforce little-endian needed for long int?
                 # thus will likely not work on big-endian?
                 data = struct.unpack( "<%d%s" % (elen//vxdlens[base], vxdtypes[base]) , edata)
                 return ((elname, data, vnptypes[base]))


#vxfopen opens file and reads vx header
def vxfopen ( fname ):
    """ open a vx file """
    cmd = ""
    vf = open(fname, "rb")
    magic  = vf.read(6)
    if magic != b'#vIsX\n' :
        return (vf, "");
    #(key, data) = vxrelem ( vf )
    #if key=="EOF":
    #   return (vf, "");
    while True:
      (key, data, nptype) = vxfreadelem(vf)
      #print (key)
      if key == "EOF":
           return (vf, key) 
      if key == "VX_FCMND":
           cmd = data 
    #print (data)
      if key == "VX_FHIST":
           if data[-1] != '\n' and data[-2] != '\n' :
               return (vf, data + '\n' + cmd)
           else:
               return (vf, data + cmd)
    return (vf, "EOF")

# read a single image
def vxfrdim(fd, vxst):
    frame = False
    pchan = 1
    while True:
      (key, data, nptype) = vxfreadelem(fd)
      #print(key)
      if key == "VX_FRAME":
          frame= True
      if key == "VX_EFRAME":
          break
      if key == "EOF":
          break
      if key == "VX_PCHAN":
          pchan = data
      if key == "VX_BBX":
          #print (data)
          #print (data[2])
          xs = int(data[1] - data[0])//pchan
          ys = int(data[3] - data[2])
          #print (xs, ys)
      if key == "VX_PBYTE" or key == "VX_PSHORT" or \
         key == "VX_PBYTE" or key == "VX_PFLOAT" or \
         key == "VX_PDOUBLE" or key == "VX_PCHAR" or \
         key == "VX_PINT" :
             numel = len(data)
             pchan = numel // ( xs * ys)
             #print (pchan, numel)
             if pchan != 1:
                  shape = (ys, xs, pchan)
             else:
                  shape = (ys, xs)
             vxst.c = pchan
             vxst.i = np.asarray(data, dtype=nptype).reshape(shape)
             if not frame:
                  break                    

# read a single image frame
def vxffrdim(fd):
    idata = ()
    xs = 0
    ys = 0
    nptype = ""
    frame = False
    status = False
    pchan = 1
    while True:
      key, data, nptype = vxfreadelem(fd)
      #print(key)
      if key == "VX_FRAME":
          frame= True
      if key == "VX_EFRAME":
          break
      if key == "EOF":
          rnptype = ""
          break
      if key == "VX_PCHAN":
          pchan = data
      if key == "VX_BBX":
          #print (data)
          #print (data[2])
          xs = int(data[1] - data[0])//pchan
          ys = int(data[3] - data[2])
          #print (xs, ys)
      if key == "VX_PBYTE" or key == "VX_PSHORT" or \
         key == "VX_PBYTE" or key == "VX_PFLOAT" or \
         key == "VX_PDOUBLE" or key == "VX_PCHAR" or \
         key == "VX_PINT" :
             numel = len(data)
             pchan = numel // ( xs * ys)
             #print (pchan, numel)
             idata = data
             rnptype = nptype
             status = True
             if not frame:
                  break
    return (status, xs, ys, pchan, rnptype, idata )

# read all images 2D and 3D
# need to fix not status on first image (error) 11/4/22
# need to add error return
def vxfrdaim(fd, vxst):
    imt = ()
    ishape = ()
    cnt = 0
    while True:
        status, ixs, iys, ichan, inptype, imdata = vxffrdim(fd)
        #print ("resp" , status, ixs, iys, inptype, len(imdata))
        if not status:
           break
        cnt += 1
        ## for future check homogenous
        if cnt == 1:
           imt =imdata
        else:
           imt += imdata
        #print (len(imt))
        xs = ixs
        ys = iys
        chan = ichan
        nptype = inptype      
    if cnt != 1:
        ishape = (cnt,)
    if chan != 1:
           ishape += (ys, xs, chan)
    else:
           ishape += (ys, xs)
    vxst.c = chan
    #print(cnt, xs, ys, chan, len (imt))
    vxst.i = np.asarray(imt, dtype=nptype).reshape(ishape)
              
def vxfread ( fname ):
    vxst = Vx() 
    if fname.endswith('.png'):
        img = Image.open(fname)
        vxst.i = np.array(img)
        npshape = vxst.i.shape
        vxst.c = 1
        if len(npshape) == 3:
            vxst.c = npshape[2]
        vxst.h = "Imported PNG: %s\n" % fname
        return (vxst)
    (fd, vxst.h) = vxfopen (fname )
    status = vxfrdaim(fd, vxst) 
    fd.close()
    return ( vxst)

if __name__ == "__main__":
    import sys
    vxx = vxfread(sys.argv[1])
    print (vxx)
    print (vxx.i)

def vximp (name):
    """ Import a file to a Vx stucture"""
    vxst = Vx()
    atype = type(name)
    if atype == str:
      if name.endswith('.png') or name.endswith('.jpg'):
        img = Image.open(name)
        vxst.i = np.asarray(img)
        if ( 3 == vxst.i.ndim ):
            vxst.c = 3;
        vxst.h = "VisionX V4 import %s" % name
      else:
        vxst = vxfread(name)
    else:
        if type(name)  == np.ndarray:
             vxst.i = np.copy(name)
             #check if 2 or 3 channels possible (a guess)

             if name.ndim > 2:
                chan = name.shape[ name.ndim-1]
                if chan > 1 and chan < 4:
                    vxst.c = chan
        else:
             vxst.i = name.i
             vxst.h = name.h
             vxst.c =name.c
    return vxst


#-------------------------------------#





def vxfwopen ( fname, cmnd, hist ):
    """ open file and write a vx header"""
    cmnd += '\n'
    xf = open(fname, "wb")
    xfname = fname + ' '
    mach = 'Lendian\n'
    xf.write(b'#vIsX\n')
    xf.write (struct.pack('I', eldcodes['VX_FNAME']))
    xf.write (struct.pack('I',len(xfname )))
    xf.write (bytearray(xfname.encode()))
    xf.write (struct.pack('I', eldcodes['VX_FCMND']))
    xf.write (struct.pack('I',len(cmnd)))
    xf.write (bytearray(cmnd.encode()))
    xf.write (struct.pack('I', eldcodes['VX_FMACH']))
    xf.write (struct.pack('I',len(mach)))
    xf.write (bytearray(mach.encode()))
    xf.write (struct.pack('I', eldcodes['VX_FUID']))
    xf.write (struct.pack('I',1))
    xf.write (struct.pack('I', eldcodes['VX_FTIME']))
    xf.write (struct.pack('I',1))
    xf.write (struct.pack('I', eldcodes['VX_FHIST']))
    xf.write (struct.pack('I',len(hist)))
    xf.write (bytearray(hist.encode()))
    #xf.write (struct.pack('I',np.array(88, dtype=np.int)))
    #xf.write (struct.pack('I',28))
    return xf

def vximwrite(xf, im, bbx, idx, c):
    """ write vx image to open file"""
    nel = im.shape[0] * im.shape[1] * c
    etype = im.dtype
    xf.write (struct.pack('I', eldcodes['VX_FRAME']))
    xf.write (struct.pack('I',idx))
    xf.write (struct.pack('I', eldcodes['VX_BBX']))
    xf.write (struct.pack('I',24))
    xf.write (bbx)
    ### figure nel and fmt
    tag = 'VX_PBYTE'
    if etype == np.byte:
        tag = 'VX_PCHAR'
    elif etype == np.short:
        tag = 'VX_PSHORT'
        nel *= 2
    elif etype == np.intc:
        tag = 'VX_PINT'
        nel *= 4
    elif etype == np.single:
        tag = 'VX_PFLOAT'
        nel *= 4
    elif etype == np.double:
        tag = 'VX_PDOUBLE'
        nel *= 8
    xf.write (struct.pack('I', eldcodes[tag]))
    xf.write (struct.pack('I',nel))
    xf.write (im)
    xf.write (struct.pack('I', eldcodes['VX_EFRAME']))
    xf.write (struct.pack('I',idx))
    
def vxfwrite ( vxst, fname):
    """ Write a vx struct to a file """
    threed = vxst.i.ndim == 4 or vxst.i.ndim == 3 and vxst.c == 1
    filename, fileext = os.path.splitext(fname)
    if fileext in ('.png', '.gif', '.tif','.tiff','pdf','jpg','jpeg'):
        if not threed:
            Image.fromarray(vxst.i).save(fname)
        else:
            Image.fromarray(vxst.i[0]).save(fname)
        return
    idx = 1
    hist = vxst.h
    cmnd = vxst.cmd
    if len(hist) == 0:
        hist='no-history '
    if len(cmnd) == 0:
        cmnd='vx.py write'
    # traditionally cmnd and hist end in 0 
    xf = vxfwopen(fname, cmnd, hist)
    bbx = np.zeros(6, dtype=np.single)
    bbx[5]= 1.0
    if not threed:
        bbx[1] = vxst.i.shape[1]
        bbx[3] = vxst.i.shape[0]
        vximwrite(xf, vxst.i, bbx, idx, vxst.c)
    else:
        n = vxst.i.shape[0]
        idx = 0
        while idx < n:
            im = vxst.i[idx]
            bbx[1] = im.shape[1]
            bbx[3] = im.shape[0]
            bbx[4] = idx
            idx += 1
            bbx[5] = idx
            vximwrite(xf, im, bbx, idx, vxst.c)
    xf.close()
#-------------------------------------#

def vfread ( file ):
   tname = file + ".npy"
   os.system("vxtonpy if=" + file + " of=" + tname)
   a = load( tname )
   os.system("rm " + tname)
   return a

def v3fread ( file ):
   tname = file + ".npy"
   os.system("vxtonpy if=" + file + " of=" + tname)
   a = load( tname )
   os.system("rm " + tname)
   return a

def vfwrite (file, arg):
   tname = file + ".npy"
   save(tname, arg)
   os.system("vnpytovx if=" + tname + " of=" + file)
   os.system("rm " + tname)
   return

def v3fwrite (file, arg):
   tname = file + ".npy"
   save(tname, arg)
   os.system("vnpytovx if=" + tname + " of=" + file)
   os.system("rm " + tname)
   return

def vfembed (img, xlo, xhi, ylo, yhi):
    stm = (ylo + yhi + img.shape[0], xlo + xhi + img.shape[1])
    tm = np.zeros( stm, dtype=uint8)
    for y in range(img.shape[0]):
        for x in range(img.shape[1]):
            tm[y+ylo,x+xlo] = img[y,x]
    return tm

def v3fembed (img, xlo, xhi, ylo, yhi,zlo,zhi):
    stm = (zlo +zhi + img.shape[0], ylo + yhi + img.shape[1],
          xlo + xhi + img.shape[2])
    tm = zeros( stm, dtype=uint8)
    for z in range(img.shape[0]):
        for y in range(img.shape[1]):
            for x in range(img.shape[2]):
                tm[z+zlo][y+ylo,x+xlo] = img[z,y,x]
    return tm

def vfnewim ( type, bbx, chan ):
    if type == 1 or type=="VX_PCHAN":
        type = 'uint8'
    stm = (bbx[3] , bbx[1] * chan)
    tm = np.zeros( stm, dtype=type)
    return tm

def v3fnewim ( type, bbx, chan ):
    if type == 1 or type == "VX_PCHAN":
        type = 'uint8'
    stm = (bbx[5] , bbx[3], bbx[1] * chan)
    tm = np.zeros( stm, dtype=type)
    return tm

def is_notebook() -> bool:
    try:
        shell = get_ipython().__class__.__name__
        if shell == 'ZMQInteractiveShell':
            return True   # Jupyter notebook or qtconsole
        elif shell == 'TerminalInteractiveShell':
            return False  # Terminal running IPython
        else:
            return False  # Other type (?)
    except NameError:
        return False      # Probably standard Python interpreter

class Vx:
   def __init__(self, *args):
     if is_notebook():
        self.cmd = 'interactive'
     else:
        self.cmd = ' '.join(sys.argv)
     if 0 == len(args) :
        self.i = np.zeros([0,0],'uint8')
        self.h = ''
        self.c = 1
        return
     if 1 == len(args) :
       # read image file
       #foo = vxread( args[0] )
       foo = vximp( args[0] )
       self.i = foo.i
       self.h = foo.h
       self.c = foo.c
     if 3 == len(args) or 2 == len(args):
        # implicit creation
        ptype = args[0]
        if not ptype in ("uint8","int8","int16","int32","float32","float64") :
          print ('error: type not supported')
          return
        bbx = args[1]
        if 2 == len(args) :
           chan = 1
        else :
           chan = args[2]
        self.c = chan
        if len(bbx) == 2 :
            if (chan != 1):
                stm = (bbx[1] , bbx[0],  chan)
            else:
                stm = (bbx[1] , bbx[0] )
        if len(bbx) == 4 :
            if (chan != 1):
                stm = (bbx[3] , bbx[1],  chan)
            else:
                stm = (bbx[3] , bbx[1] )
        elif len(bbx) == 3 :
            if (chan != 1):
                stm = (bbx[2] , bbx[1], bbx[0], chan)
            else:
                stm = (bbx[2], bbx[1] , bbx[0])
        elif len(bbx) == 6 :
            if (chan != 1):
                stm = (bbx[5] , bbx[3], bbx[1], chan)
            else:
                stm = (bbx[5], bbx[3] , bbx[1])
        else :
            print ('error: bounding box has wrong length')
            return
        self.h=""
        # if c != 1 then reshape
        self.i = np.zeros( stm, dtype=ptype)
        # if c != 1 then reshape
   def __repr__(self):
        fmt_str = 'VisionX V4: ' + self.__class__.__name__ + '\n'
        fmt_str += '    Image Size: {}\n'.format(self.i.shape)
        fmt_str += '    Pixel Type: {}\n'.format(self.i.dtype)
        fmt_str += '    Number of channels: {}\n'.format(self.c)
        return fmt_str

#snip---------------------------------------
   def  write(self, wfile):
        vxfwrite(self, wfile)

#snip---------------------------------------
   def  setim(self, imarray ):
        self.i = imarray
   def  embedim(self, vals ):
          vxin = self.i
          xlo=0
          ylo=0
          zlo=0
          __sh = self.i.shape
          __dim= self.i.ndim
          __lshape = len(vals)
          if __dim == 2 :
              if __lshape != 4 : 
                 print ('error: wrong number of offsets"')
                 return
              else:
                 ylo=vals[2]
                 xlo=vals[0]
                 yhi=vals[3]
                 xhi=vals[1]
                 stm = (ylo + yhi + self.i.shape[0], xlo +xhi + self.i.shape[1])
                 self.i = np.zeros( stm, dtype=self.i.dtype)
                 for y in range(vxin.shape[0]):
                     for x in range(vxin.shape[1]):
                        self.i[y+ylo,x+xlo] = vxin[y,x]
          else:
              if __lshape != 6 : 
                 print ('error: wrong number of offsets')
                 return
              else:
                 zlo=vals[4]
                 ylo=vals[2]
                 xlo=vals[0]
                 zhi=vals[5]
                 yhi=vals[3]
                 xhi=vals[1]
                 stm = (zlo +zhi + self.i.shape[0], ylo + yhi + self.i.shape[1],
                       xlo + xhi + self.i.shape[2])
                 self.i = np.zeros( stm, dtype=vxin.dtype )
                 for z in range(vxin.shape[0]):
                     for y in range(vxin.shape[1]):
                       for x in range(vxin.shape[2]):
                         self.i[z+zlo,y+ylo,x+xlo] = vxin[z,y,x]
#----------------
# list based vx file io
def vrfile ( fname ):
    body  = []
    head = ""
    (fd, head) = vxfopen (fname )
    ## check on correct open
    if  0 == len(head):
        fd.close()
        return (head, body)

    while True:
        (key, data, nptype) = vxfreadelem(fd)
        if key == 'EOF':
                   break
        base = eldcodes[key] & 0xf 
        if base == 10 or base == 0 :
          body.append((key, data))
        else:
          body.append((key, np.asarray(data, dtype=nptype)))
    fd.close()
    return ( head, body )

def vwfile ( fname, head, body, cmnd="vx.py-write" ):
    fd = vxfwopen(fname, cmnd, head)
    for (tag, val) in body:
      # write tag
      fd.write (struct.pack('I', eldcodes[tag]))
      # find data length for val
      # for type 0
      base = eldcodes[tag] & 0xf 
      if base == 10 :
          fd.write (struct.pack('I',val))
      elif base == 0 :
          fd.write (struct.pack('I',len(val)))
          fd.write (bytearray(val.encode()))
          # other types
          # need to ensure val is correct type for tag
          # and deep copy if necessary
      else:
         nel = len(val) * vxdlens[base]
         fd.write (struct.pack('I',nel))
         fd.write (np.asarray(val, dtype=vnptypes[base]))
    fd.close()

#----------------
__VXtmp = [];
__VXtmc = 1;
__VXresp ='foo'
__VXrim =''

def vxxread(rfile ):
        vxx = Vx();
        __pfix = rfile
        if len(rfile)  == 0 :
              __pfix = "VX.py"
        tname = __pfix +  ".npy"
        hname = __pfix +  ".pyhdr"
        os.system("vxtonpy if=" + rfile + " of=" + tname + " oh=" + hname)
        vxx.i = np.load( tname)
        vxx.h=open(hname).read()
        os.system("rm " + tname + " " + hname)
        __meta =  [i for i in vxx.h.split('\n') if i != ''][-1]
        vxx.c = int(__meta.split('=')[1].split(',')[0])
        if vxx.c != 1 :
            __oshape = vxx.i.shape
            __nshape = (__oshape[:-1]) + (int( __oshape[-1]/vxx.c), vxx.c)
            vxx.i = reshape(vxx.i, __nshape)
        return(vxx)
        
def  vxxwrite(vxx, wfile):
        __pfix = wfile
        if len(wfile)  == 0 :
              __pfix = "VX.py"
        txname = __pfix  + ".pyhist"
        tfile  = open( txname, "w")
        tfile.write ( vxx.h )
        s=' '
        args= s.join(sys.argv)
        tfile.write ( args )
        tfile.close()
        tname = __pfix  + ".npy"
        if vxx.c != 1 :
            __oshape = vxx.i.shape
            __nshape = (__oshape[:-2]) + ( __oshape[-1] * __oshape[-2],)
            __tmpi = np.reshape(vxx.i, __nshape)
            save(tname, __tmpi)
            del __tmpi
        else :
            np.save(tname, vxx.i)
        os.system("vnpytovx if=" + tname + " of=" + wfile + ',t="' + args + '" ih=' + txname + " c=" + str(vxx.c))
        os.system("rm " + tname + " " + txname)
   

def vxcom (__arg):
    __a = string.replace(string.replace(__arg, "{","'+str(",),"}",")+'")
    __b = "'" + __a + "'"
    return subprocess.check_output( eval(__b), shell=True).decode()
def vcom2 (__arg):
    global __VXresp;
    return  subprocess.check_output( __arg, stderr=subprocess.STDOUT, shell=True).decode()
def vcom (__arg):
    global __VXresp;
    __VXresp =  subprocess.check_output( __arg, stderr=subprocess.STDOUT, shell=True).decode()
    return __VXresp;
def vxshreturn ():
    global __VXresp
    return __VXresp
def vsub ( arg ) :
    b = string.replace(string.replace(arg, "{","'+str(",),"}",")+'")
    return ( "'" + b + "'")

def VXtclean ( ):
    global __VXtmp, __VXtmc;
    for i in __VXtmp:
        vcom2 ( 'rm -f '+ i)
    __VXtmp = [];
    
def vdovar (arg ):
    global __VXtmp, __VXtmc;
    #atype = type(arg).__name__;
    atype = type(arg).__name__;
    #print (atype);
    if -1 != str.find('int float long double', atype):
        return str(arg);
    elif atype == 'str':
        if arg == '__VXtmp' :   #this is an of=
            tmname = 'tmp.vxpy.'+ str(os.getpid()) + '.'+ str(__VXtmc);
            __VXtmc += 1;
            __VXtmp.append(tmname);
            return tmname;
        else:
            return arg;
    elif isinstance(arg, Vx):
            #print 'VX found'
            #create tmp name
            tmname = 'tmp.vxpy.'+ str(os.getpid()) + '.'+ str(__VXtmc);
            __VXtmc += 1;
            __VXtmp.append(tmname);
            #write file to tmp name
            arg.write(tmname);
            #return tmp name
            return tmname;
    else: 
        raise TypeError ('vdovar ' + atype)
    return 'X'+ arg+'X'

def vxshim ( arg ):
    global __VXtmp, __VXtmc, __VXrim;
    if arg == 1:
      __VXrim = Vx(__VXtmp[-1])
      return __VXrim.i
    else:
      return __VXrim.c

def vxsh ( arg ):
    a = str.split(arg, ' ')
    plist='vx.vcom( '
    polist='\');vx.VXtclean();'
    dolist='\''
    # chk for assignment, start name = ...
    pl = str.split(arg, '=')
    if len(pl) > 1 :
        wd = str.strip(pl[0])
        if -1 == str.find(wd, ' '):
            plist = wd + ' = ' + plist;
            pl.pop(0);
            a = str.split('='.join(pl));
    for i in a:
        if -1 != str.find(i, '$'):
            j = str.split (i, '$');
            #print 'found ', j[0]
            #find if of=
            if j[0] == 'of=':
                #polist='\'); ' + j[1] + ' = vx.Vx(vx.__VXtmp[-1]);vx.VXtclean();'
                #v2: polist='\'); ' + j[1] + '.i = vx.Vx(vx.__VXtmp[-1]).i;vx.VXtclean();'
                polist='\'); ' + j[1] + '.i = vx.vxshim(1); ' + j[1]+'.c = vx.vxshim(2);vx.VXtclean();'
                dolist += ' ' + j[0] + '\' + vx.vdovar("__VXtmp") + \''
            else:
                dolist += ' ' + j[0] + '\' + vx.vdovar(' + j[1] + ') + \''
        else:
            dolist += ' ' + i
            #print i
    return plist + dolist + polist;
def vxinfo( vxarg):
    #if type(vxim)  == np.ndarray:
    res = {}
    vxim = vximp(vxarg)
    res['shape'] = np.shape(vxim.i)
    res['dtype'] = vxim.i.dtype
    #res[bbox'] = vxim.bbx
    res['color'] = vxim.c == 3
    return res

def vxstats( vxarg):
    res = {}
    vxim = vximp(vxarg)
    res['mean'] = round(np.mean(vxim.i), 5)
    res['median'] = round(np.median(vxim.i), 5)
    res['min'] = round(np.min(vxim.i), 5)
    res['max'] = round(np.max(vxim.i), 5)
    res['std'] = round(np.std(vxim.i), 5)
    vq = vxim.i.astype(float)
    #vq = np.where(vxim.i == 0, 'NaN',vq)
    vq[vxim.i==0] = np.nan
    res['mean0'] = round(np.nanmean(vq), 5)
    res['median0'] = round(np.nanmedian(vq), 5)
    res['min0'] = round(np.nanmin(vq), 5)
    res['max0'] = round(np.nanmax(vq), 5)
    res['std0'] = round(np.nanstd(vq), 5)
    return res

