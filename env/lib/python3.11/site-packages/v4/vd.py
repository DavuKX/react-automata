"""
vd.py: Utilities for image presentation in JN reports
"""
# 2023-7-26 updated dhist, plotsmimag, dispmvx, dispsvx
 

import sys
import numpy as np
from v4 import vx
#import vx as vx
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import matplotlib.cm as cm
from PIL import Image
import subprocess
import os


def commandexists(command):
   """ Check if a command exists"""
   try:
      fnull = open(os.devnull, 'w')
      subprocess.call([command], stdout=fnull, stderr=subprocess.STDOUT)
      return True
   except OSError:
      return False 

def disptxt (name, **kwargs):
    ofile = sys.stdout
    outf = False
    if 'of' in kwargs:
        ofile = open (kwargs['of'], 'w')
        outf = True
    if type(name)  == Image.Image:      
        im = np.asarray(name)
    else:
        if type(name) != np.ndarray:
           im = name.i
    if im.ndim == 3:
       y,x,c = im.shape
       ym = min(y,25) 
       xm = min(x,25)
       for y in range (ym):
        #print ("|", end="")
        for x in range (xm):
            print ("%3d" %im[y,x,0], end=" ", file=ofile )
        print("", file=ofile)
        for x in range (xm):
            print ("%3d" %im[y,x,1], end=" ", file=ofile )
        print("", file=ofile)
        for x in range (xm):
            print ("%3d" %im[y,x,2], end=" ", file=ofile )
        print("", file=ofile)
        #print ("|", end="")
        #for x in range (xm):
        #    print ("   " %img[y,x], end=" " )
        if not outf:
           print("", file=ofile)
    else:
      y,x = im.shape
      ym = min(y,25) 
      xm = min(x,25) 
      for y in range (ym):
        #print ("|", end="")
        for x in range (xm):
            print ("%3d" %im[y,x], end=" ", file=ofile )
        print("", file=ofile)
        #print ("|", end="")
        #for x in range (xm):
        #   print ("   " , end=" " )
        if not outf:
           print("", file=ofile)
    if outf:
        ofile.close()
        


def dispvx (name, *argv, **kwargs):
    """ Display a VisionX or other image"""
    ofile = False
    if "file" in kwargs:
        ofile = True
        
    vxst = vx.vximp(name)
    img = Image.fromarray(vxst.i)
    
    small = max(img.size ) < 26
    if "sm" in kwargs:
        small = kwargs[sm]
    if small:
      if commandexists('vpv'):
        vimg=vx.Vx()
        #exec(vx.vxsh( 'vpv if=$vxst of=tmpvpv.vx' ));
        exec(vx.vxsh( 'vpv if=$vxst of=$vimg' ));
        #vimg = vx.Vx('tmpvpv.vx')
        img = Image.fromarray(vimg.i)
        #exec(vx.vxsh( 'rm tmpvpv.vx'))
      else:
        if ( ofile ):
            small = False
            dispsvx(vxst, file=kwargs['file'])
        else: 
            dispsvx(vxst)
            if 'capt' in kwargs:
               print(kwargs['capt'])
            for i in argv:
               print(i)
        return
    if ( ofile):
        fname = kwargs["file"]
        if not fname.endswith('.png'):
            fname += ".png"
        img.save(fname)
    else:
        display (img)
        if 'capt' in kwargs:
            print(kwargs['capt'])
        for i in argv:
            print(i)   

def plotsmimg(ax, image, title, plot_text, image_values, color, scale, vmin, vmax):
    """Plot an image, overlaying image values or indices.
    """
    
    if scale == 'cart':
        ax.imshow(np.flip(image, axis=0), cmap='gray', aspect='equal',
                                    vmin=vmin, vmax=vmax, origin='lower')
    else:
        ax.imshow(image, cmap='gray', aspect='equal', vmin=vmin, vmax=vmax)
    ax.set_title(title)
    ax.set_yticks([])
    ax.set_xticks([])
    if scale != 'none':
        ax.set_yticks(range(image.shape[0]))
        ax.set_xticks(range(image.shape[1]))
    lcolor = 'blue'
    lcolor = color
    my = image.shape[0]

    for x in np.arange(-0.5, image.shape[1], 1.0):
        ax.add_artist(Line2D((x, x), (-0.5, image.shape[0] - 0.5),
                             color=lcolor, linewidth=1))

    for y in np.arange(-0.5, image.shape[0], 1.0):
        ax.add_artist(Line2D((-0.5, image.shape[1]), (y, y),
                             color=lcolor, linewidth=1))

    if plot_text:
        for i, j in np.ndindex(*image_values.shape):
            pri = i
            if scale == 'cart':
               pri = my - 1 -i
            ax.text(j, pri, image_values[i, j], fontsize=8,
                    horizontalalignment='center',
                    verticalalignment='center',
                    color='black')
    return

def dispmvx ( *argv, **kwargs):
    """ Display multiple VisionX or other images (scaled)
        [capt = ]
        [scale =]
        [size=]
        [fixed=True]
        [values=True]
        [file= fname]
        [grid=(rows, cols)]
    """
    ### check for multiple images
    
    # add vmin and vmax for unscaled option
    # add grid option 
    # make tile a separate function????
    # fix fixed... 3D iamges are homogeneous
    #
    #check for 3D image
    vim = vx.vximp(argv[0])
    vshape = vim.i.shape
    scolor = vshape[-1] == 3
    smopt = False
    threed = False
   
    if len(vshape) == 4 or (len(vshape)==3 and vshape[2] != 3):
        threed = True
        if ('fixed' in kwargs) :
                vmin = 0
                vmax = 255
        else:
                vmin = np.min(vim.i)
                vmax = np.max(vim.i)

    scale = 'none'
    #scale options: cart, table, none
    size = 1.0
    psize = 8
    if 'size' in kwargs:
        size = kwargs['size']
    #  plt.figure(figsize=(8, 1), dpi=100)
    #else:
    #plt.figure(figsize=(8, 4), dpi=100)
    if 'pvalues' in kwargs:
       smopt = True
    if 'scale' in kwargs:
        scale = kwargs['scale']
    if 'grid' in kwargs:
        row, col = kwargs['grid']
    else:
        row = 1
        if threed:
            col = vshape[0]
        else:
            col = len(argv)
        if smopt and scolor:
            col *= 3
    if threed:
        nim = vshape[0]
    else:
        nim = len(argv)
    #if threed:
        #nim = min( row * col ,vshape[0] )
    #else:
        #nim = min(row * col, len(argv))
    #nim = len(argv)
    clrcnt = 0
    cnt = 0
    icnt = 0
    sstr = ""
    gmax = row * col
    ## debug
    #print(row, col, nim, smopt,scolor)
    while cnt < gmax and icnt < nim:
        if threed:
            dim = vim.i[icnt]
        else:
            vim = vx.vximp(argv[icnt])
            dim = vim.i
            scolor = 3 == vim.i.shape[-1]
        if cnt == 0:
             if smopt :
                 psize = min(dim.shape[1] * size * 0.7 * col, 8 * size) 
                 # Debug
                 #  print (dim.shape[1] * size * 0.5 * col, 8 * size)
             else:
                psize = min(dim.shape[1] * size * 0.5 * col, 8 * size)
             plt.figure(figsize=(psize,( psize/2) * col/row ), dpi=100)
        if not threed:
            sstr += "(%i x %i) "% (dim.shape[0], dim.shape[1])
        
        if smopt:
            lcolor = 'blue'
            if ('fixed' in kwargs ):
                prange = 256
                base = 0
            else:
                base = np.min(dim)
                prange = np.max(dim) - base
                if prange == 0:
                    prange += 1
            if scolor:
               image = dim[:,:,clrcnt]
               lcolor = ('red', 'green','blue')[clrcnt]
               clrcnt += 1
            else:
                image = dim
            gim = (127 +((image.astype('float') - base) * 128/prange)).astype('uint8')
            plotsmimg( plt.subplot(row, col, cnt+1), gim, '',
                       plot_text=True, image_values=image, color=lcolor, 
                       scale=scale, vmin=0, vmax=256)
        else:
         plt.subplot(row, col, cnt + 1)
         if 'cart' == scale:
           if ('fixed' in kwargs ) or threed:
              if not threed:
                  vmin = 0
                  vmax=255
              plt.imshow(np.flip(dim, axis=0), cmap=cm.gray,
                   vmin=vmin, vmax=vmax, origin='lower');
           else:
              plt.imshow(np.flip(dim, axis=0), cmap=cm.gray,
                   origin='lower');
         else:
           if ('fixed' in kwargs ) or threed:
              if not threed:
                  vmin = 0
                  vmax=255
              plt.imshow(dim, vmin=vmin, vmax=vmax, cmap=cm.gray);
           else:
              plt.imshow(dim, cmap=cm.gray);
           if scale == 'none':
                plt.axis('off')
        if clrcnt == 3:
               clrcnt = 0
        if clrcnt == 0:
           icnt += 1
        cnt += 1
        if cnt >= gmax:
               break
        

    if 'file' in kwargs:
        plt.savefig(kwargs['file'])
    else:
        plt.show()
    if 'capt' in kwargs:
        print(kwargs['capt'])
    print('<scaled size: %s>' % sstr)




def dispsvx ( *argv, **kwargs):
    """ Display multiple SMALL VisionX or other images (scaled)
        (list of images for a row)
        [size = ]
        [scale = ]

    """
    scale = 'none'
    size = 1.0
    clr = False
    lcolor = 'blue'
    if 'size' in kwargs:
        size = kwargs['size']

    if 'scale' in kwargs:
        scale = kwargs['scale']
    # manage color
    vxx = vx.vximp(argv[0])
    xsize = vxx.i.shape[1]
    if xsize > 40 :
        print ('dispsvx warning: image size too large for detailed display')
    ### check here for image too large
   

    if vxx.c > 1:
        argv = []
        clr = True
        #### unless fixed intensity scale
        vmin = 0
        vmax = 128 + np.max(vxx.i)//2
        for i in range(0,vxx.c):
            argv.append(vxx.i[:,:,i].reshape(vxx.i.shape[0], vxx.i.shape[1]))

    nim = len(argv)
    cnt = 1
    sstr = ""
    for i in argv:
        vim = vx.vximp(i)
        sstr += "(%i x %i) "% (vim.i.shape[0], vim.i.shape[1])
        image =vim.i
        if cnt == 1:
             psize = vim.i.shape[1] * size * 0.4 * nim
             plt.figure(figsize=(psize, psize), dpi=100)
        if clr and cnt < 4:
            lcolor = ('red', 'green','blue')[cnt - 1]
        imgs = 128 + image//2
        if not clr:
           vmin = 0
           vmax = np.max(imgs)
        if 128 == vmax:
               vmax = 256
        plotsmimg( plt.subplot(1, nim, cnt), imgs, '',
             plot_text=True, image_values=image, color=lcolor, 
             scale=scale, vmin=vmin, vmax=vmax)

        cnt += 1
    if 'file' in kwargs:
        plt.savefig(kwargs['file'])
    else:
        plt.show()
    if 'capt' in kwargs:
        print(kwargs['capt'])
    print('<scaled size: %s>' % sstr)

def dhist (img,**kwargs):
    '''plot a Histogram for a byte image
       [title = ]
       [bins = <n>]
       [range = (low, high)]
       [histtype = {'bar', 'barstacked', 'step', 'stepfilled'}]
    '''
    ### to do: fix auto bins and scaled bins when data type not ubyte
    vxst = vx.vximp(img)
    color = vxst.c == 3
    
    plt.figure()
    if 'histtype' in kwargs:
        histtype = kwargs['histtype']
    else:
        histtype = 'bar'
    if 'title' in kwargs:
        plt.title(kwargs['title'])
    else:
        if color:
            plt.title("Color Histogram")
        else:
            plt.title("Grayscale Histogram")
    if 'range' in kwargs:
        range=kwargs['range']
    else:
        range=(0.0, 255.0)
    if 'bins' in kwargs:
        bins=kwargs['bins']
    else:
        bins=256
    if color:
        plt.xlabel("color value")
    else:
        plt.xlabel("grayscale value")
    plt.ylabel("pixels")
    #plt.xlim([0.0, 255.0])  
    #plt.plot(bin_edges[0:-1], histogram)
    if color:
       colors = ("red", "green", "blue")
       channel_ids = (0, 1, 2)
       for channel_id, c in zip(channel_ids, colors):
           if len(vxst.i.shape) == 4:
               histogram, bin_edges = np.histogram(
                 vxst.i[:,:, :, channel_id], bins=bins, range=range
               ) 
           else:
               histogram, bin_edges = np.histogram(
                 vxst.i[:, :, channel_id], bins=bins, range=range
               ) 
           plt.plot(bin_edges[0:-1], histogram, color=c)
    else:  
       plt.hist(np.reshape(vxst.i, -1), bins, histtype=histtype, range=range)
    if 'file' in kwargs:
        plt.savefig(kwargs['file'])
    else:
        plt.show()
        if 'capt' in kwargs:
           print(kwargs['capt'])

